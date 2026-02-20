// TROQUE AQUI: 55 + DDD + número (somente números)
// Ex: (37) 99868-7629 -> 5537998687629
const PHONE = "5537998687629";
const CLINIC = "ClinMed";

function waLink(message) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function setWhatsLinks() {
  const msg = `Olá! Quero agendar um atendimento na ${CLINIC}.`;
  const link = waLink(msg);

  ["whatsHeader", "whatsHero", "whatsFooter", "whatsSpecs"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });
}

function setupLeadForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("leadName")?.value?.trim() || "";
    const phone = document.getElementById("leadPhone")?.value?.trim() || "";
    const email = document.getElementById("leadEmail")?.value?.trim() || "";
    const agree = document.getElementById("agreeWa")?.checked ?? true;

    const parts = [];
    parts.push(`Olá! Quero informações e agendar atendimento na ${CLINIC}.`);
    if (name) parts.push(`Nome: ${name}`);
    if (phone) parts.push(`Telefone/WhatsApp: ${phone}`);
    if (email) parts.push(`E-mail: ${email}`);
    if (agree) parts.push(`Autorizo contato pelo WhatsApp.`);
    const msg = parts.join("\n");

    window.open(waLink(msg), "_blank", "noreferrer");
  });
}

function setupMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  if (!btn || !menu) return;

  const close = () => {
    menu.classList.remove("show");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("show");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", close);
  });

  // fecha ao clicar fora (mobile)
  document.addEventListener("click", (e) => {
    const target = e.target;
    const clickedInside = menu.contains(target) || btn.contains(target);
    if (!clickedInside) close();
  });
}

function setupYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.14 }
  );

  els.forEach((el) => io.observe(el));
}

function setupToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 500) btn.classList.add("show");
    else btn.classList.remove("show");
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

setWhatsLinks();
setupLeadForm();
setupMenu();
setupYear();
setupReveal();
setupToTop();
