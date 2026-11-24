/* Общий код внутренних страниц v2: шапка (с языками RU | EN | 日本), выезжающее меню, подвал (одинаковые на всех страницах),
   перевод, раскрывающиеся вопросы и формы. Страница говорит, кто она: <body data-page="menu">.
   Переводы самой страницы лежат в window.PAGE_I18N = { en: {...}, ja: {...} } (задаётся на странице до этого файла).
   Русский берётся прямо из страницы. Выбор языка общий с главной (localStorage 'soyka-lang') */
(function () {
  const page = document.body.dataset.page || '';
  const on = p => (p === page ? ' class="on"' : '');
  const DELIV = 'https://delivery.soyka.rest/';   // доставка — их отдельный магазин с корзиной и оплатой, оставляем ссылкой

  /* общие надписи шапки, меню и подвала — те же, что на главной (index.html) */
  const SHARED = {
    en: { menu: 'Menu', dBar: 'Bar & wine', intTitle: 'Interior', book: 'Book a table', delivery: 'Delivery',
          fCert: 'Gift card', fCard: 'Bonus card', fFeed: 'Feedback', fJobs: 'Vacancies', ctTitle: 'Contact',
          ctAddr: '6 8 Marta St., Yekaterinburg', ctH1: 'Sun–Thu 12:00–00:00', ctH2: 'Fri–Sat 12:00–01:00',
          fCopy: '© 2026 Soyka. All rights reserved', fPriv: 'Privacy policy', fAgree: 'Consent to data processing',
          menuOpen: 'Open menu', menuClose: 'Close menu', home: 'Soyka — home' },
    ja: { menu: 'メニュー', dBar: 'バー＆ワイン', intTitle: 'インテリア', book: 'ご予約', delivery: 'デリバリー',
          fCert: 'ギフトカード', fCard: 'ポイントカード', fFeed: 'お問い合わせ', fJobs: '求人', ctTitle: 'お問い合わせ',
          ctAddr: 'エカテリンブルク、8マルタ通り6番地', ctH1: '日〜木 12:00〜24:00', ctH2: '金・土 12:00〜翌1:00',
          fCopy: '© 2026 ソイカ. All rights reserved', fPriv: 'プライバシーポリシー', fAgree: '個人情報の取り扱いへの同意',
          menuOpen: 'メニューを開く', menuClose: 'メニューを閉じる', home: 'ソイカ — ホーム' }
  };

  const icons = `
    <a href="tel:+73433284284" aria-label="Позвонить"><svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z"/></svg></a>
    <a href="https://telegram.me/Soykarestaurant" target="_blank" rel="noopener" aria-label="Telegram"><svg viewBox="0 0 24 24"><path d="M21.4 4.3L2.9 11.4c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.5c.3-1.3-.5-1.8-1.4-1.5zM9 14.2l9-5.7c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.2z"/></svg></a>
    <a href="https://vk.com/soykarest" target="_blank" rel="noopener" aria-label="VK"><svg viewBox="0 0 24 24"><path d="M12.8 17.5C6.9 17.5 3.5 13.4 3.3 6.5h3c.1 5 2.3 7.2 4.1 7.6V6.5h2.8v4.3c1.7-.2 3.6-2.2 4.2-4.3h2.8a8.3 8.3 0 01-3.8 5.4 8.6 8.6 0 014.4 5.6h-3.1a5.4 5.4 0 00-4.5-3.9v3.9z"/></svg></a>`;

  document.body.insertAdjacentHTML('afterbegin', `
  <div class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer-shade" data-close></div>
    <aside class="drawer-panel" role="dialog" aria-label="Меню сайта">
      <button class="drawer-x" type="button" aria-label="Закрыть меню" data-i18n-aria="menuClose" data-close>✕</button>
      <nav class="drawer-nav">
        <a href="menu.html"${on('menu')} data-i18n="menu">Меню</a>
        <a href="menu.html#bar" data-i18n="dBar">Бар и вино</a>
        <a href="index.html#interior" data-i18n="intTitle">Интерьер</a>
        <a href="bronirovanie.html"${on('book')} data-i18n="book">Забронировать</a>
        <a href="${DELIV}" target="_blank" rel="noopener" data-i18n="delivery">Доставка</a>
        <a href="certificate.html"${on('cert')} data-i18n="fCert">Сертификат</a>
        <a href="card.html"${on('card')} data-i18n="fCard">Получить карту</a>
        <a href="feedback.html"${on('feedback')} data-i18n="fFeed">Обратная связь</a>
        <a href="vakansii.html"${on('jobs')} data-i18n="fJobs">Вакансии</a>
        <a href="index.html#contacts" data-i18n="ctTitle">Контакты</a>
      </nav>
      <div class="drawer-info">
        <p data-i18n="ctAddr">г. Екатеринбург, ул. 8 Марта, 6</p>
        <p><span data-i18n="ctH1">ВС–ЧТ с 12:00 до 00:00</span><br><span data-i18n="ctH2">ПТ–СБ с 12:00 до 01:00</span></p>
        <div class="drawer-icons">${icons}</div>
      </div>
    </aside>
  </div>
  <header class="top">
    <div class="top-left">
      <button class="burger" id="burger" type="button" aria-label="Открыть меню" data-i18n-aria="menuOpen" aria-expanded="false" aria-controls="drawer"><i></i><i></i><i></i></button>
      <nav class="langs" aria-label="Язык сайта">
        <button type="button" data-lang="ru">RU</button><i>|</i>
        <button type="button" data-lang="en">EN</button><i>|</i>
        <button type="button" data-lang="ja">日本</button>
      </nav>
    </div>
    <a class="top-logo" href="index.html" aria-label="Сойка — на главную" data-i18n-aria="home"><img src="img/logo.png" alt="Сойка"></a>
    <div class="top-right">
      <a class="hide-m${page === 'menu' ? ' on' : ''}" href="menu.html" data-i18n="menu">Меню</a>
      <a class="hide-m${page === 'book' ? ' on' : ''}" href="bronirovanie.html" data-i18n="book">Забронировать</a>
      <a class="deliv" href="${DELIV}" target="_blank" rel="noopener" data-i18n="delivery">Доставка</a>
    </div>
  </header>`);

  document.body.insertAdjacentHTML('beforeend', `
  <footer class="foot2">
    <a class="foot-logo2" href="index.html" aria-label="Сойка — на главную" data-i18n-aria="home"><img src="img/logo.png" alt="Сойка"></a>
    <nav class="foot-nav2" aria-label="Страницы ресторана">
      <a href="menu.html" data-i18n="menu">Меню</a>
      <a href="${DELIV}" target="_blank" rel="noopener" data-i18n="delivery">Доставка</a>
      <a href="bronirovanie.html" data-i18n="book">Забронировать</a>
      <a href="certificate.html" data-i18n="fCert">Сертификат</a>
      <a href="card.html" data-i18n="fCard">Получить карту</a>
      <a href="feedback.html" data-i18n="fFeed">Обратная связь</a>
      <a href="vakansii.html" data-i18n="fJobs">Вакансии</a>
      <a href="index.html#contacts" data-i18n="ctTitle">Контакты</a>
    </nav>
    <div class="foot-legal">
      <span data-i18n="fCopy">© 2026 Сойка. Все права защищены</span>
      <a href="privacy.html" data-i18n="fPriv">Политика конфиденциальности</a>
      <a href="soglasie.html" data-i18n="fAgree">Согласие на обработку данных</a>
    </div>
  </footer>`);

  /* ===== Перевод ===== */
  const PAGE = window.PAGE_I18N || {};
  const dict = lang => Object.assign({}, SHARED[lang] || {}, PAGE[lang] || {});
  // русский вариант каждого элемента запоминаем из самой страницы (один раз)
  const keep = (el, prop, val) => { if (el.dataset[prop] === undefined) el.dataset[prop] = val; return el.dataset[prop]; };
  function setLang(lang) {
    if (!SHARED[lang] && lang !== 'ru') lang = 'ru';
    const d = lang === 'ru' ? {} : dict(lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const ru = keep(el, 'ruText', el.textContent);
      el.textContent = d[el.dataset.i18n] !== undefined ? d[el.dataset.i18n] : ru;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const ru = keep(el, 'ruHtml', el.innerHTML);
      el.innerHTML = d[el.dataset.i18nHtml] !== undefined ? d[el.dataset.i18nHtml] : ru;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const ru = keep(el, 'ruPh', el.getAttribute('placeholder') || '');
      el.setAttribute('placeholder', d[el.dataset.i18nPh] !== undefined ? d[el.dataset.i18nPh] : ru);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const ru = keep(el, 'ruAria', el.getAttribute('aria-label') || '');
      el.setAttribute('aria-label', d[el.dataset.i18nAria] !== undefined ? d[el.dataset.i18nAria] : ru);
    });
    // то, что видно только на других языках (например, «документ только на русском»)
    document.querySelectorAll('[data-only-lang]').forEach(el => { el.hidden = !el.dataset.onlyLang.split(' ').includes(lang); });
    if (d.title || lang === 'ru') document.title = d.title || keep(document.documentElement, 'ruTitle', document.title);
    document.querySelectorAll('.langs button').forEach(b => {
      b.classList.toggle('on', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', b.dataset.lang === lang);
    });
    try { localStorage.setItem('soyka-lang', lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));   // страница может перестроить своё (например, КБЖУ)
  }
  keep(document.documentElement, 'ruTitle', document.title);
  document.querySelectorAll('.langs button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  let saved = 'ru';
  try { saved = localStorage.getItem('soyka-lang') || 'ru'; } catch (e) {}
  window.SOYKA_LANG = () => document.documentElement.lang || 'ru';
  window.SOYKA_T = key => (dict(window.SOYKA_LANG())[key]);
  setLang(saved);

  /* меню: открыть / закрыть крестиком, по фону, по Esc */
  const drawer = document.getElementById('drawer'), burger = document.getElementById('burger');
  function setOpen(open) {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
    if (open) drawer.querySelector('.drawer-x').focus(); else burger.focus();
  }
  burger.addEventListener('click', () => setOpen(true));
  drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => setOpen(false)));
  drawer.querySelectorAll('.drawer-nav a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) setOpen(false); });

  /* раскрывающиеся вопросы */
  document.querySelectorAll('.faq-q').forEach(q => q.addEventListener('click', () => {
    const item = q.closest('.faq-item'), open = !item.classList.contains('open');
    item.classList.toggle('open', open);
    q.setAttribute('aria-expanded', open);
  }));

  /* формы. ⚠️ Набросок: заявки пока никуда не уходят — при сдаче подключаем к их почте / CRM */
  document.querySelectorAll('form.form').forEach(f => {
    f.querySelectorAll('input[type=range]').forEach(r => {
      const out = f.querySelector(`output[for="${r.id}"]`);
      if (out) r.addEventListener('input', () => { out.textContent = r.value; });
    });
    f.querySelectorAll('input[type=tel]').forEach(t => t.addEventListener('input', () => {
      const d = t.value.replace(/\D/g, '').slice(0, 10);
      const p = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 8), d.slice(8, 10)];
      t.value = d.length > 3 ? `(${p[0]}) ${p[1]}${d.length > 6 ? '-' + p[2] : ''}${d.length > 8 ? '-' + p[3] : ''}` : p[0];
    }));
    f.addEventListener('submit', e => {
      e.preventDefault();
      f.classList.add('sent');
      f.nextElementSibling && f.nextElementSibling.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();
