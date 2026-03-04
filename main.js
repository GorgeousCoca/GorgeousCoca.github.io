// Простая демо-логика для MVP: слоты бронирования, меню, вакансии и новости.

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initBookingSelects();
  initMenuTabs();
  initVacancies();
  initNews();
  initDemoForms();
});

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  function openMenu() {
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Закрыть меню");
  }

  function closeMenu() {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
  }

  function isOpen() {
    return document.body.classList.contains("nav-open");
  }

  toggle.addEventListener("click", () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640 && isOpen()) closeMenu();
  });
}

function initBookingSelects() {
  const timeOptions = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
  ];

  const bookingTime = document.getElementById("booking-time");
  if (bookingTime) {
    fillTimeSelect(bookingTime, timeOptions);
  }

  const timeLi = document.getElementById("time-li");
  if (timeLi) {
    fillTimeSelect(timeLi, timeOptions);
  }
}

function fillTimeSelect(select, slots) {
  slots.forEach((slot, index) => {
    const option = document.createElement("option");
    option.value = slot;
    option.textContent = slot;
    if (index === 4) {
      option.disabled = true;
      option.textContent = `${slot} — занято`;
    }
    select.appendChild(option);
  });
}

function initMenuTabs() {
  const container = document.querySelector("[data-menu-tabs]");
  if (!container) return;

  const tabs = Array.from(container.querySelectorAll(".menu-tab"));
  const listEl = document.getElementById("menu-list");
  if (!listEl) return;

  const menuData = {
    starters: [
      { name: "Брускетта с томатами", desc: "Хрустящий хлеб, спелые томаты, базилик, оливковое масло", price: "520 ₽" },
      { name: "Буррата с томатами", desc: "Кремовая буррата, томаты, песто из базилика", price: "980 ₽" },
    ],
    pizza: [
      { name: "Маргарита", desc: "Томаты, моцарелла, базилик, оливковое масло", price: "720 ₽" },
      { name: "Дьявола", desc: "Пикантная салями, томатный соус, моцарелла, перец чили", price: "860 ₽" },
    ],
    pasta: [
      { name: "Карбонара", desc: "Спагетти, гуанчале, яйцо, пекорино романо", price: "840 ₽" },
      { name: "Тальятелле с рагу", desc: "Домашняя паста, медленно томлёное мясное рагу", price: "890 ₽" },
    ],
    desserts: [
      { name: "Тирамису", desc: "Классический десерт по рецепту Mirco Zanini", price: "520 ₽" },
      { name: "Панна-котта", desc: "Сезонные ягоды, ваниль, сливки", price: "480 ₽" },
    ],
  };

  function renderCategory(key) {
    const items = menuData[key] || [];
    listEl.innerHTML = "";
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "menu-row";
      row.innerHTML = `
        <div class="menu-row-main">
          <div class="menu-row-name">${item.name}</div>
          <div class="menu-row-desc">${item.desc}</div>
        </div>
        <div class="menu-row-price">${item.price}</div>
      `;
      listEl.appendChild(row);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-menu-category");
      renderCategory(category);
    });
  });

  renderCategory("starters");
}

function initVacancies() {
  const list = document.getElementById("vacancy-list");
  if (!list) return;

  const roleFilter = document.getElementById("vacancy-filter-role");
  const restaurantFilter = document.getElementById("vacancy-filter-restaurant");

  const vacancies = [
    {
      title: "Повар горячего цеха",
      restaurant: "Little Italy",
      role: "kitchen",
      salary: "от 70 000 ₽",
      schedule: "5/2, сменный график",
      experience: "от 1 года",
    },
    {
      title: "Су-шеф",
      restaurant: "Mircuccio",
      role: "kitchen",
      salary: "от 95 000 ₽",
      schedule: "5/2",
      experience: "от 2 лет",
    },
    {
      title: "Официант",
      restaurant: "Romeo's",
      role: "hall",
      salary: "от 60 000 ₽",
      schedule: "2/2, смены по 12 часов",
      experience: "без опыта, обучение",
    },
    {
      title: "Бармен",
      restaurant: "Arancino",
      role: "hall",
      salary: "от 65 000 ₽",
      schedule: "2/2",
      experience: "от 1 года",
    },
    {
      title: "Менеджер ресторана",
      restaurant: "Little Italy",
      role: "management",
      salary: "от 100 000 ₽",
      schedule: "5/2",
      experience: "от 2 лет",
    },
    {
      title: "Курьер",
      restaurant: "Romeo's",
      role: "delivery",
      salary: "от 55 000 ₽",
      schedule: "гибкий",
      experience: "без опыта",
    },
  ];

  function renderVacancies() {
    const role = roleFilter?.value || "";
    const rest = restaurantFilter?.value || "";
    list.innerHTML = "";

    vacancies
      .filter((v) => (role ? v.role === role : true))
      .filter((v) => (rest ? v.restaurant === rest : true))
      .forEach((vacancy) => {
        const item = document.createElement("article");
        item.className = "vacancy-item";
        item.innerHTML = `
          <div class="vacancy-main">
            <h3>${vacancy.title}</h3>
            <div class="vacancy-meta">
              <span>${vacancy.restaurant}</span>
              <span>${vacancy.schedule}</span>
              <span>Опыт: ${vacancy.experience}</span>
            </div>
          </div>
          <div class="vacancy-info">
            <div class="vacancy-pill">Вакансия</div>
            <div class="vacancy-salary">${vacancy.salary}</div>
          </div>
          <div class="vacancy-cta">
            <button type="button" class="btn btn-secondary">Откликнуться</button>
          </div>
        `;
        const button = item.querySelector("button");
        if (button) {
          button.addEventListener("click", () => {
            const form = document.getElementById("career-form");
            if (form) {
              const roleInput = document.getElementById("career-role");
              if (roleInput) {
                roleInput.value = vacancy.title;
                roleInput.focus();
              }
              window.scrollTo({ top: form.offsetTop - 80, behavior: "smooth" });
            }
          });
        }
        list.appendChild(item);
      });
  }

  roleFilter?.addEventListener("change", renderVacancies);
  restaurantFilter?.addEventListener("change", renderVacancies);
  renderVacancies();
}

function initNews() {
  const list = document.getElementById("news-list");
  if (!list) return;

  const tabsContainer = document.querySelector("[data-news-tabs]");
  const tabs = tabsContainer ? Array.from(tabsContainer.querySelectorAll(".tab")) : [];

  const items = [
    {
      type: "events",
      tag: "Афиша",
      title: "Гастроужин в Mircuccio",
      date: "12 апреля 2026",
      desc: "Пятиблюдный сет от шефа в паре с итальянскими винами семейных хозяйств.",
    },
    {
      type: "events",
      tag: "Афиша",
      title: "Вечер Серии A в Little Italy",
      date: "Каждое воскресенье",
      desc: "Трансляции ключевых матчей, пицца и фирменные закуски от команды Little Italy.",
    },
    {
      type: "news",
      tag: "Новость",
      title: "Новая дегустация вин в Romeo's",
      date: "Март 2026",
      desc: "Обновили винную карту и запустили ежемесячные дегустации с сомелье.",
    },
    {
      type: "news",
      tag: "Новость",
      title: "Запуск кондитерской витрины",
      date: "Февраль 2026",
      desc: "В Romeo's появилась витрина с десертами на вынос и тортами на заказ.",
    },
    {
      type: "news",
      tag: "Новость",
      title: "Обновление меню Arancino",
      date: "Январь 2026",
      desc: "Добавили блюда с артишоками, сезонными овощами и легкие десерты.",
    },
  ];

  function renderNews(filter) {
    list.innerHTML = "";
    items
      .filter((i) => (filter === "all" ? true : i.type === filter))
      .forEach((item) => {
        const el = document.createElement("article");
        el.className = "news-item";
        el.innerHTML = `
          <p class="tag">${item.tag}</p>
          <h3>${item.title}</h3>
          <p class="meta">${item.date}</p>
          <p>${item.desc}</p>
          <button type="button" class="read-more">Читать далее</button>
        `;
        const button = el.querySelector(".read-more");
        if (button) {
          button.addEventListener("click", () => {
            alert("В MVP подробная страница события открывается в попапе. Здесь можно показать расширенный текст.");
          });
        }
        list.appendChild(el);
      });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-news-category") || "all";
      renderNews(category === "events" ? "events" : category === "news" ? "news" : "all");
    });
  });

  renderNews("all");
}

function initDemoForms() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Спасибо! В MVP заявка отправляется демо-способом. В боевой версии форма будет подключена к почте или CRM.");
      form.reset();
    });
  });
}

