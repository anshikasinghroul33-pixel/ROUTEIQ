(() => {
  const sidebar = document.querySelector("#sidebar, aside.sidebar, aside.desktop-sidebar");
  if (!sidebar) {
    console.error("RouteIQ sidebar could not be initialized: sidebar element is missing.");
    return;
  }

  const inRuteFolder = /[\\/]rute[\\/]/i.test(window.location.pathname);
  const localPrefix = inRuteFolder ? "" : "rute/";
  const parentPrefix = inRuteFolder ? "../" : "";
  const dashboardPath = "dashboard.html";
  const pageRoutes = [
    { id: "dashboard", label: "Dashboard", icon: "layout-dashboard", href: dashboardPath, file: "dashboard.html" },
    { id: "orders", label: "Orders", icon: "package-search", href: "orders.html", file: "orders.html" },
    { id: "riders", label: "Riders", icon: "bike", href: `${parentPrefix}riders.html`, file: "riders.html" },
    { id: "restaurants", label: "Restaurants", icon: "store", href: `${localPrefix}restaurant.html`, file: "restaurant.html" },
    { id: "live", label: "Live Operations", icon: "radio-tower", href: "liveoperations.html", file: "liveoperations.html" },
    { id: "analytics", label: "Analytics", icon: "chart-no-axes-combined", href: `${localPrefix}analytics.html`, file: "analytics.html" },
    { id: "alerts", label: "Alerts", icon: "bell", href: `${localPrefix}alerts.html`, file: "alerts.html" }
  ];

  const currentFile = decodeURIComponent(window.location.pathname).split(/[\\/]/).pop().toLowerCase();
  const activePage = currentFile === "index.html" ? "dashboard.html" : currentFile;
  const brandLogo = `${parentPrefix}routeiq-logo.svg`;

  sidebar.id = "sidebar";
  sidebar.className = "routeiq-sidebar";
  sidebar.setAttribute("aria-label", "Main navigation");
  sidebar.innerHTML = `
    <a class="routeiq-brand" href="${dashboardPath}" aria-label="RouteIQ Operations dashboard">
      <img src="${brandLogo}" alt="RouteIQ">
      <span class="routeiq-brand-copy">
        <span class="routeiq-brand-name">RouteIQ</span>
        <span class="routeiq-brand-subtitle">Operations</span>
      </span>
    </a>
    <div class="routeiq-nav-label">Management</div>
    <nav class="routeiq-nav">
      ${pageRoutes.map(page => `
        <a class="routeiq-nav-link${activePage === page.file ? " is-active" : ""}"
           href="${page.href}"${activePage === page.file ? ' aria-current="page"' : ""}>
          <i data-lucide="${page.icon}" aria-hidden="true"></i>
          <span>${page.label}</span>
          ${page.id === "alerts" ? '<span id="sidebarAlertCount" class="routeiq-alert-count">5</span>' : ""}
        </a>
      `).join("")}
    </nav>
    <div class="routeiq-sidebar-footer">
      <span>Smarter Deliveries</span>
      <strong>Better Operations</strong>
    </div>
  `;

  let overlay = document.getElementById("routeiqSidebarOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "routeiqSidebarOverlay";
    overlay.setAttribute("aria-hidden", "true");
    sidebar.insertAdjacentElement("beforebegin", overlay);
  }

  const mainContent = document.querySelector("main, .main, .main-content");
  mainContent?.classList.add("routeiq-main-content");

  let menuButton = document.getElementById("routeiqSidebarMenu")
    || document.getElementById("mobileMenu");
  if (!menuButton) {
    menuButton = document.createElement("button");
    const header = document.querySelector("main header, header");
    if (header) {
      header.insertAdjacentElement("afterbegin", menuButton);
    } else {
      document.body.insertAdjacentElement("afterbegin", menuButton);
    }
  }
  menuButton.id = "routeiqSidebarMenu";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';

  const closeSidebar = () => {
    sidebar.classList.remove("routeiq-sidebar-open");
    overlay.classList.remove("routeiq-overlay-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("routeiq-sidebar-open");
    overlay.classList.toggle("routeiq-overlay-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  overlay.addEventListener("click", closeSidebar);
  sidebar.querySelectorAll("a").forEach(link => link.addEventListener("click", closeSidebar));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeSidebar();
  });

  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
})();
