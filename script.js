/* Stratos Ed Tech Systems
   Edit SERVICES to change a price. Amounts are MRP from the current service list.
   Billing: "" | "per month" | "for 2 months" | "for 3 months" | "per year"
   Do not add a warranty block. The public site does not advertise one.

   Enquiry delivery:
   - Default: opens a real email to the work inbox. This page does not store the form.
   - Sheet log (private, not written by this page): https://docs.google.com/spreadsheets/d/1a0D90hbNkvY_1mBwT2_9YwVmpg06n87zLSFCQdLgf-k/edit
     Tab: Enquiries. Its old column layout does not yet include the redesigned fields; map them before connecting an endpoint.
   - Later: set STRATOS_CONFIG.enquiryEndpoint to a POST URL that appends one row. The same payload is sent as JSON.
   Future roles, not built yet: Owner, Backend Developer, Frontend Developer, Helpdesk, Project Manager.
*/
window.STRATOS_CONFIG = {
  enquiryEndpoint: "",
  enquiryEmail: "stratos.edtechsys@gmail.com",
  site: "https://stratosedtech.live",
  roles: ["Owner", "Backend Developer", "Frontend Developer", "Helpdesk", "Project Manager"]
};

const SERVICES = [
  { id: "landing-page", name: "Landing Page", category: "regular", tier: "Regular", price: 199, billing: "", summary: "A single page for a school event, an offer, or a short introduction.", features: ["One-page layout", "Usable on a phone", "Space for your text and a contact point"] },
  { id: "logo-branding", name: "Logo & Branding", category: "regular", tier: "Regular", price: 199, billing: "", summary: "A simple mark and basic brand direction for the web and for documents.", features: ["Logo concept", "Colour and type direction", "Suitable for a header and documents"] },
  { id: "website-maintenance", name: "Website Maintenance", category: "regular", tier: "Regular", price: 199, billing: "per month", summary: "Ongoing upkeep for a website that is already live.", features: ["Monthly listed service", "For a site that already exists", "Scope agreed in the enquiry"] },
  { id: "payment-gateway", name: "Payment Gateway Integration", category: "regular", tier: "Regular", price: 199, billing: "", summary: "Connect a payment gateway to a site or app you already have.", features: ["Gateway you choose", "Basic success and failure path", "Integration, not a new store"] },
  { id: "attendance", name: "Attendance System Integration", category: "regular", tier: "Regular", price: 299, billing: "", summary: "Connect attendance into a school or business workflow.", features: ["Attendance hook-up", "Works with an existing system", "Integration, not a new platform"] },
  { id: "ui-ux", name: "UI/UX Design", category: "regular", tier: "Regular", price: 299, billing: "", summary: "Interface design for a page, a flow, or a small product.", features: ["Layout and interface direction", "A defined screen or flow", "Notes a developer can build from"] },
  { id: "student-portal", name: "Student-Portal Integration", category: "regular", tier: "Regular", price: 299, billing: "", summary: "Connect a student portal into a school setup.", features: ["Portal connection", "Student access flow", "For an existing or Stratos-built system"] },
  { id: "seo", name: "SEO Optimization", category: "regular", tier: "Regular", price: 399, billing: "", summary: "Foundational search setup for a site you already have.", features: ["Titles and descriptions", "Basic on-page structure", "A short indexing checklist"] },
  { id: "chatbot", name: "AI Chatbot Integration", category: "regular", tier: "Regular", price: 499, billing: "", summary: "Add a chatbot to a site or app that is already in use.", features: ["Placed on an existing page", "A defined set of questions", "Connection work, not a new product"] },
  { id: "hosting", name: "Hosting & Domain Setup", category: "regular", tier: "Regular", price: 499, billing: "per year", summary: "Domain and hosting put in place for a site.", features: ["Domain and hosting setup", "Yearly listed MRP", "The domain stays in your name"] },
  { id: "admin-panel", name: "Custom Admin Panel Integration", category: "regular", tier: "Regular", price: 799, billing: "", summary: "An admin panel connected to a site or application.", features: ["Screens for everyday tasks", "Connected to the product it serves", "Structured so access roles can be added later"] },

  { id: "school-lms-basic", name: "School LMS (Basic)", category: "school", tier: "Basic", price: 1499, billing: "per month", summary: "A school learning system at the Basic listed rate.", features: ["Classwork and learning materials", "Built for school use", "Tier scope confirmed in the enquiry"] },
  { id: "school-lms-standard", name: "School LMS (Standard)", category: "school", tier: "Standard", price: 2499, billing: "per month", summary: "A school learning system at the Standard listed rate.", features: ["Classwork and learning materials", "Built for school use", "Tier scope confirmed in the enquiry"] },
  { id: "school-lms-premium", name: "School LMS (Premium)", category: "school", tier: "Premium", price: 3999, billing: "per month", summary: "A school learning system at the Premium listed rate.", features: ["Classwork and learning materials", "Built for school use", "Tier scope confirmed in the enquiry"] },
  { id: "school-website-basic", name: "School Website (Basic)", category: "school", tier: "Basic", price: 1499, billing: "per month", summary: "A school website at the Basic listed rate.", features: ["Public school website", "Usable on a phone", "Tier scope confirmed in the enquiry"] },
  { id: "school-website-standard", name: "School Website (Standard)", category: "school", tier: "Standard", price: 2499, billing: "per month", summary: "A school website at the Standard listed rate.", features: ["Public school website", "Usable on a phone", "Tier scope confirmed in the enquiry"] },
  { id: "school-website-premium", name: "School Website (Premium)", category: "school", tier: "Premium", price: 3999, billing: "for 2 months", summary: "A school website at the Premium listed rate. The amount covers 2 months.", features: ["Public school website", "Usable on a phone", "This MRP covers 2 months, not one"] },

  { id: "business-website-basic", name: "Business Website (Basic)", category: "web", tier: "Basic", price: 2499, billing: "per month", summary: "A business website at the Basic listed rate.", features: ["Public business website", "Usable on a phone", "Tier scope confirmed in the enquiry"] },
  { id: "business-website-standard", name: "Business Website (Standard)", category: "web", tier: "Standard", price: 3499, billing: "per month", summary: "A business website at the Standard listed rate.", features: ["Public business website", "Usable on a phone", "Tier scope confirmed in the enquiry"] },
  { id: "business-website-premium", name: "Business Website (Premium)", category: "web", tier: "Premium", price: 4999, billing: "for 2 months", summary: "A business website at the Premium listed rate. The amount covers 2 months.", features: ["Public business website", "Usable on a phone", "This MRP covers 2 months, not one"] },
  { id: "web-app-basic", name: "Custom Web-App (Basic)", category: "web", tier: "Basic", price: 2499, billing: "per month", summary: "A custom web application at the Basic listed rate.", features: ["A defined school or business workflow", "Runs in the browser", "Tier scope confirmed in the enquiry"] },
  { id: "web-app-standard", name: "Custom Web-App (Standard)", category: "web", tier: "Standard", price: 3299, billing: "per month", summary: "A custom web application at the Standard listed rate.", features: ["A defined school or business workflow", "Runs in the browser", "Tier scope confirmed in the enquiry"] },
  { id: "web-app-premium", name: "Custom Web-App (Premium)", category: "web", tier: "Premium", price: 4399, billing: "for 2 months", summary: "A custom web application at the Premium listed rate. The amount covers 2 months.", features: ["A defined school or business workflow", "Runs in the browser", "This MRP covers 2 months, not one"] },

  { id: "android-basic", name: "Android App Development (Basic)", category: "mobile", tier: "Basic", price: 2499, billing: "per month", summary: "Android app development at the Basic listed rate.", features: ["Android, as named on the list", "Not an iOS build", "Tier scope confirmed in the enquiry"] },
  { id: "mobile-standard", name: "Android, iOS App (Standard)", category: "mobile", tier: "Standard", price: 3499, billing: "for 2 months", summary: "Android and iOS at the Standard listed rate. The amount covers 2 months.", features: ["Android and iOS, as named on the list", "This MRP covers 2 months, not one", "Tier scope confirmed in the enquiry"] },
  { id: "mobile-premium", name: "Android, iOS App (Premium)", category: "mobile", tier: "Premium", price: 5999, billing: "for 3 months", summary: "Android and iOS at the Premium listed rate. The amount covers 3 months.", features: ["Android and iOS, as named on the list", "This MRP covers 3 months, not one", "Tier scope confirmed in the enquiry"] }
];

const GROUPS = [
  { id: "group-regular", category: "regular", title: "Regular Services", text: "Every service on this list priced below ₹999. These are single services, not Basic, Standard or Premium packages." },
  { id: "group-school-lms", category: "school", title: "School LMS", ids: ["school-lms-basic", "school-lms-standard", "school-lms-premium"], text: "A learning system for classwork, materials and student use. The list sets the tier and the MRP. Exact scope for the tier is agreed in the project enquiry." },
  { id: "group-school-website", category: "school", title: "School Website", ids: ["school-website-basic", "school-website-standard", "school-website-premium"], text: "A public website for a school. Premium is listed as an amount for 2 months. Basic and Standard are listed per month." },
  { id: "group-business-website", category: "web", title: "Business Website", ids: ["business-website-basic", "business-website-standard", "business-website-premium"], text: "A public website for a business. Premium is listed as an amount for 2 months. Basic and Standard are listed per month." },
  { id: "group-web-app", category: "web", title: "Custom Web-App", ids: ["web-app-basic", "web-app-standard", "web-app-premium"], text: "A web application for a school or business workflow. Premium is listed as an amount for 2 months. Basic and Standard are listed per month." },
  { id: "group-mobile", category: "mobile", title: "Mobile App Development", ids: ["android-basic", "mobile-standard", "mobile-premium"], text: "Basic is Android only. Standard and Premium are Android and iOS. Standard is an amount for 2 months. Premium is an amount for 3 months." }
];

const PROJECTS = [
  {
    id: "schoolworks",
    name: "SchoolWorks",
    summary: "A digital classwork-sharing platform designed for students. Classwork and learning materials can be shared digitally, instead of relying only on physical notebooks or paper.",
    note: "A Stratos education technology project. A public link has not been published yet.",
    tags: ["Education technology", "Classwork", "Students"]
  }
];

const PAGES = {
  home: "Stratos Ed Tech Systems",
  about: "About · Stratos Ed Tech Systems",
  services: "Services and prices · Stratos Ed Tech Systems",
  projects: "Projects · Stratos Ed Tech Systems",
  build: "Build Your Project · Stratos Ed Tech Systems",
  contact: "Contact · Stratos Ed Tech Systems"
};

function inr(n) {
  const s = String(n);
  if (s.length <= 3) return "₹" + s;
  const last = s.slice(-3);
  let rest = s.slice(0, -3);
  const parts = [];
  while (rest.length > 2) {
    parts.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest) parts.unshift(rest);
  return "₹" + parts.join(",") + "," + last;
}

function esc(s) {
  return String(s)
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;")
    .replace(/'/g, "\u0026#39;");
}

function priceHTML(service) {
  const unit = service.billing
    ? '<span class="' + (service.billing.indexOf("for ") === 0 ? "strong" : "") + '">' + esc(service.billing) + "</span>"
    : "<span>MRP</span>";
  return '<p class="price"><b>' + inr(service.price) + "</b>" + unit + "</p>";
}

function featuresHTML(list) {
  return '<ul class="feature-list">' + list.map(function (item) {
    return "<li>" + esc(item) + "</li>";
  }).join("") + "</ul>";
}

function lowest(category) {
  return SERVICES.filter(function (s) { return s.category === category; })
    .reduce(function (min, s) { return s.price < min.price ? s : min; });
}

function renderCatalogue() {
  const root = document.getElementById("catalogue");
  if (!root) return;
  root.innerHTML = GROUPS.map(function (group) {
    const items = group.ids
      ? group.ids.map(function (id) { return SERVICES.find(function (s) { return s.id === id; }); })
      : SERVICES.filter(function (s) { return s.category === group.category; });
    const body = group.ids
      ? '<div class="tier-grid">' + items.map(function (s) {
        return '<article class="tier' + (s.tier === "Premium" ? " premium" : "") + '"><p class="label">' + esc(s.tier) + "</p><h3>" + esc(s.name) + "</h3>" + priceHTML(s) + "<p>" + esc(s.summary) + "</p>" + featuresHTML(s.features) + "</article>";
      }).join("") + "</div>"
      : items.map(function (s) {
        return '<article class="rate"><div><p class="label">' + esc(s.tier) + "</p><h3>" + esc(s.name) + "</h3><p>" + esc(s.summary) + "</p>" + featuresHTML(s.features) + "</div>" + priceHTML(s) + "</article>";
      }).join("");
    return '<section class="group" id="' + group.id + '" data-cat="' + group.category + '"><div class="group-head"><h2>' + esc(group.title) + "</h2><p>" + esc(group.text) + "</p></div>" + body + "</section>";
  }).join("");
}

function renderProjects() {
  const html = PROJECTS.map(function (project) {
    return '<article class="project"><div><p class="eyebrow">Stratos project</p><h3>' + esc(project.name) + "</h3><p>" + esc(project.summary) + '</p><p class="meta">' + esc(project.note) + "</p></div><ul class=\"tags\">" + project.tags.map(function (tag) { return "<li>" + esc(tag) + "</li>"; }).join("") + "</ul></article>";
  }).join("");
  ["featured-project", "project-list"].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
  const more = document.getElementById("more-projects");
  if (more) {
    more.hidden = PROJECTS.length > 1;
    more.textContent = PROJECTS.length > 1 ? "" : "More projects will appear here when they are ready to show.";
  }
}

function fillStarts() {
  document.querySelectorAll("[data-from]").forEach(function (el) {
    const s = lowest(el.getAttribute("data-from"));
    el.textContent = inr(s.price) + (s.billing ? " " + s.billing : "");
  });
}

const ENQUIRY_SERVICES = [
  "Business Website Development", "School Website Development", "School LMS", "Custom Web Application", "Android App Development", "Landing Page Development", "Website Maintenance", "Logo & Branding", "UI/UX Design", "SEO Optimization", "Hosting & Domain Setup", "AI Chatbot Integration", "Payment Gateway Integration", "Attendance System Integration", "Student Portal Integration", "Custom Admin Panel Integration", "Website & App Support", "App UI/UX Design", "App Maintenance"
];

function fillServices() {
  const root = document.getElementById("service-choices");
  if (!root) return;
  ENQUIRY_SERVICES.forEach(function (name) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "services";
    input.value = name;
    label.appendChild(input);
    label.appendChild(document.createTextNode(name));
    root.appendChild(label);
  });
}

function parseHash() {
  const raw = (location.hash || "#home").replace(/^#/, "");
  if (PAGES[raw]) return { page: raw, anchor: "" };
  if (raw.indexOf("group-") === 0) return { page: "services", anchor: raw };
  return { page: "home", anchor: "" };
}

function showPage(page, anchor) {
  document.querySelectorAll(".page").forEach(function (el) {
    el.classList.toggle("is-on", el.id === "page-" + page);
  });
  document.querySelectorAll(".nav a").forEach(function (a) {
    const on = a.getAttribute("href") === "#" + page;
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = PAGES[page];
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  if (nav) nav.classList.remove("is-open");
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (anchor && anchor.indexOf("group-") === 0) {
    document.querySelectorAll("#catalogue .group").forEach(function (group) { group.hidden = false; });
    document.querySelectorAll("#filters button").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-filter") === "all" ? "true" : "false");
    });
  }
  if (anchor) {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  } else {
    window.scrollTo(0, 0);
  }
}

function field(form, name) {
  return form.elements[name];
}

function setError(form, name, message) {
  const wrap = form.querySelector('[data-field="' + name + '"]');
  const slot = form.querySelector("#err-" + name);
  if (wrap) wrap.classList.toggle("is-invalid", Boolean(message));
  if (slot) slot.textContent = message || "";
  const input = field(form, name);
  if (input && input.setAttribute) {
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }
}

function validate(form) {
  const read = function (name) { return field(form, name).value.trim(); };
  const data = {
    fullName: read("fullName"), email: read("email"), phone: read("phone"),
    organization: read("organization"), street: read("street"), city: read("city"), postcode: read("postcode"),
    services: Array.from(form.querySelectorAll('input[name="services"]:checked'), function (input) { return input.value; }),
    tier: read("tier"), existingWebsite: read("existingWebsite"),
    projectName: read("projectName"), description: read("description"),
    budget: read("budget"), preferredDate: read("preferredDate"), additional: read("additional"),
    contactMethod: read("contactMethod"), preferredTime: read("preferredTime"),
    consent: field(form, "consent").checked
  };
  const digits = data.phone.replace(/\D/g, "");
  const errors = {
    fullName: data.fullName.length >= 2 ? "" : "Enter your full name.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? "" : "Enter a valid email address.",
    phone: digits.length >= 8 && digits.length <= 15 ? "" : "Enter a WhatsApp number with 8 to 15 digits.",
    services: data.services.length ? "" : "Choose at least one service.",
    description: data.description.length >= 20 ? "" : "Describe your requirement in at least 20 characters.",
    contactMethod: data.contactMethod ? "" : "Choose how Stratos should reply.",
    consent: data.consent ? "" : "Please confirm before preparing the email."
  };
  Object.keys(errors).forEach(function (key) { setError(form, key, errors[key]); });
  return { ok: Object.keys(errors).every(function (key) { return !errors[key]; }), data: data };
}

function summaryText(data) {
  return [
    "Stratos project enquiry", "",
    "A / PERSONAL INFORMATION",
    "Full name: " + data.fullName,
    "Email address: " + data.email,
    "WhatsApp number: " + data.phone,
    "Business / school name: " + (data.organization || "—"),
    "Street address: " + (data.street || "—"),
    "City: " + (data.city || "—"),
    "Postcode: " + (data.postcode || "—"), "",
    "B / SERVICES",
    "Services requested: " + data.services.join("; "),
    "Service category: " + (data.tier || "Not sure / not applicable"),
    "Existing website: " + (data.existingWebsite || "—"), "",
    "C / PROJECT DETAILS",
    "Project name: " + (data.projectName || "—"),
    "Requirement: " + data.description,
    "Approximate budget: " + data.budget,
    "Preferred delivery date: " + (data.preferredDate || "—"),
    "More information: " + (data.additional || "—"), "",
    "D / CONTACT & CONFIRMATION",
    "Preferred contact method: " + data.contactMethod,
    "Preferred contact time (IST): " + (data.preferredTime || "—"),
    "Information accuracy and project-discussion consent: Confirmed"
  ].join("\n");
}

function showConfirm(kind, summary) {
  const box = document.getElementById("confirmation");
  const form = document.getElementById("project-form");
  const title = document.getElementById("confirm-title");
  const copy = document.getElementById("confirm-copy");
  const pre = document.getElementById("confirm-summary");
  if (kind === "stored") {
    title.textContent = "Project enquiry submitted";
    copy.textContent = "Stratos has the enquiry and will reply using the contact method you chose.";
  } else if (kind === "fallback") {
    title.textContent = "Enquiry could not be stored";
    copy.textContent = "The save step did not succeed. An email to " + window.STRATOS_CONFIG.enquiryEmail + " was prepared instead. Send that email, or copy the summary below.";
  } else {
    title.textContent = "Enquiry ready to send";
    copy.textContent = "Your answers are addressed to " + window.STRATOS_CONFIG.enquiryEmail + ". Send the email that opened. If nothing opened, copy the summary and send it yourself. This page does not store the form until a backend address is connected.";
  }
  pre.textContent = summary;
  form.hidden = true;
  box.hidden = false;
  title.focus();
}

function bindForm() {
  const form = document.getElementById("project-form");
  if (!form) return;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (field(form, "company_website").value) return;
    const result = validate(form);
    if (!result.ok) {
      const first = form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
      if (first) first.focus();
      return;
    }
    const payload = {
      submittedAt: new Date().toISOString(), status: "new", source: "stratosedtech.live",
      customer: {
        fullName: result.data.fullName, email: result.data.email, phone: result.data.phone,
        organization: result.data.organization, street: result.data.street,
        city: result.data.city, postcode: result.data.postcode
      },
      project: {
        services: result.data.services, tier: result.data.tier,
        existingWebsite: result.data.existingWebsite, name: result.data.projectName,
        description: result.data.description, budget: result.data.budget,
        preferredDeliveryDate: result.data.preferredDate, additional: result.data.additional,
        contactMethod: result.data.contactMethod, preferredContactTimeIST: result.data.preferredTime,
        consentConfirmed: result.data.consent
      }
    };
    const summary = summaryText(result.data);
    const endpoint = window.STRATOS_CONFIG.enquiryEndpoint;
    if (!endpoint) {
      showConfirm("email", summary);
      window.location.href = "mailto:" + window.STRATOS_CONFIG.enquiryEmail + "?subject=" + encodeURIComponent("Project enquiry — " + result.data.fullName) + "&body=" + encodeURIComponent(summary);
      return;
    }
    const button = document.getElementById("submit-project");
    button.disabled = true;
    button.textContent = "Submitting…";
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("not accepted");
      showConfirm("stored", summary);
    }).catch(function () {
      showConfirm("fallback", summary);
      window.location.href = "mailto:" + window.STRATOS_CONFIG.enquiryEmail + "?subject=" + encodeURIComponent("Project enquiry — " + result.data.fullName) + "&body=" + encodeURIComponent(summary);
    }).finally(function () {
      button.disabled = false;
      button.textContent = "Submit Project";
    });
  });

  document.getElementById("copy-summary").addEventListener("click", function () {
    const text = document.getElementById("confirm-summary").textContent;
    const btn = document.getElementById("copy-summary");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Copied";
      }).catch(function () {
        btn.textContent = "Copy the summary manually";
      });
    } else {
      btn.textContent = "Copy the summary manually";
    }
  });

  document.getElementById("another-enquiry").addEventListener("click", function () {
    form.reset();
    form.hidden = false;
    document.getElementById("confirmation").hidden = true;
    form.querySelectorAll(".is-invalid").forEach(function (el) { el.classList.remove("is-invalid"); });
    form.querySelectorAll(".error").forEach(function (el) { el.textContent = ""; });
    form.querySelectorAll('[aria-invalid="true"]').forEach(function (el) { el.removeAttribute("aria-invalid"); });
    field(form, "fullName").focus();
  });
}

function bindNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }
  });
  document.getElementById("filters").addEventListener("click", function (event) {
    const btn = event.target.closest("[data-filter]");
    if (!btn) return;
    const filter = btn.getAttribute("data-filter");
    document.querySelectorAll("#filters button").forEach(function (b) {
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    document.querySelectorAll("#catalogue .group").forEach(function (group) {
      group.hidden = filter !== "all" && group.getAttribute("data-cat") !== filter;
    });
  });
}

let motionObserver;
function observeCurrentPage() {
  if (!motionObserver) return;
  document.querySelectorAll(".page.is-on .reveal:not(.is-visible)").forEach(function (el) {
    motionObserver.observe(el);
  });
}
function setupMotion() {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  motionObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: "0px 0px -20px 0px" });
  document.querySelectorAll(".section, .band, .page-head, .prose").forEach(function (el) {
    el.classList.add("reveal");
  });
  document.documentElement.classList.add("motion-ready");
  observeCurrentPage();
}

function route() {
  const next = parseHash();
  showPage(next.page, next.anchor);
  observeCurrentPage();
}

document.getElementById("year").textContent = String(new Date().getFullYear());
renderCatalogue();
renderProjects();
fillStarts();
fillServices();
bindForm();
bindNav();
window.addEventListener("hashchange", route);
route();
setupMotion();
