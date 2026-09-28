/* ================================================================
   SJNHS WEBSITE SCRIPT
   STAFF EDIT AREA:
   - Keep the SEARCH_INDEX array below updated as sections change.
   - Image replacement controls use browser localStorage only.
   - Replace placeholder school links/content in index.html with verified data.
================================================================ */

const SEARCH_INDEX = [
  {title:"About SJNHS", category:"About", target:"#about", keywords:"history background identity school"},
  {title:"Mission and Vision", category:"About", target:"#mission", keywords:"mission vision promise values"},
  {title:"Enrollment Procedures", category:"Enrollment", target:"#enrollment", keywords:"enroll enrollment requirements admission registration"},
  {title:"Special Science Curriculum (SSC)", category:"Academics", target:"#academics", keywords:"ssc special science curriculum"},
  {title:"Special Program in Journalism (SPJ)", category:"Academics", target:"#academics", keywords:"spj journalism special program journalism"},
  {title:"Senior High School", category:"Academics", target:"#academics", keywords:"senior high school shs stem assh techpro b&e strands"},
  {title:"STEM", category:"Senior High School", target:"#academics", keywords:"science technology engineering mathematics"},
  {title:"ASSH", category:"Senior High School", target:"#academics", keywords:"assh"},
  {title:"TECHPRO", category:"Senior High School", target:"#academics", keywords:"techpro technical professional"},
  {title:"B&E", category:"Senior High School", target:"#academics", keywords:"business entrepreneurship b&e"},
  {title:"Campus Life", category:"Students", target:"#students", keywords:"students campus programs activities"},
  {title:"SSLG", category:"Students", target:"#sslg", keywords:"sslg student leadership government"},
  {title:"Registered Organizations", category:"Students", target:"#organizations", keywords:"organizations clubs science red cross arts athletics entrepreneurs eco"},
  {title:"Alumni", category:"Students", target:"#alumni", keywords:"graduates alumni association"},
  {title:"ANLUWAGE", category:"Publications", target:"#publications", keywords:"publication anluwage"},
  {title:"TNL", category:"Publications", target:"#publications", keywords:"publication tnl the new leaf"},
  {title:"Research Archive", category:"Research", target:"#research", keywords:"research archive papers"},
  {title:"Past Research Papers", category:"Research", target:"#research", keywords:"research papers documents"},
  {title:"Teachers Organization Chart", category:"Administration", target:"#administration", keywords:"teachers faculty organizational chart"},
  {title:"TEA", category:"Administration", target:"#administration", keywords:"tea teachers association"},
  {title:"PTA", category:"Administration", target:"#administration", keywords:"pta parent teacher association"},
  {title:"Guidance Counselor", category:"Administration", target:"#administration", keywords:"guidance counselor student support"},
  {title:"School Administration", category:"Administration", target:"#administration", keywords:"principal administration school leadership"},
  {title:"BAC", category:"Administration", target:"#administration", keywords:"bac bids awards committee"},
  {title:"Finance Office", category:"Administration", target:"#administration", keywords:"finance office money"},
  {title:"Records Office", category:"Administration", target:"#administration", keywords:"records transcript school records"},
  {title:"LRPO", category:"Administration", target:"#administration", keywords:"lrpo learning resources property"},
  {title:"Prefect", category:"Administration", target:"#administration", keywords:"prefect discipline welfare"},
  {title:"Awards and Recognition", category:"Resources", target:"#resources", keywords:"awards recognition achievements honors"},
  {title:"School Policy", category:"Resources", target:"#resources", keywords:"policy rules regulations"},
  {title:"Dress Code", category:"Resources", target:"#resources", keywords:"uniform dress code appearance"},
  {title:"Schedule of Classes", category:"Resources", target:"#resources", keywords:"schedule classes timetable"},
  {title:"Prohibited Items", category:"Resources", target:"#resources", keywords:"prohibited items safety"},
  {title:"Student Handbook", category:"Resources", target:"#resources", keywords:"handbook student rules"},
  {title:"FAQs", category:"Resources", target:"#faqs", keywords:"frequently asked questions"},
  {title:"Hotline Numbers", category:"Contact", target:"#hotlines", keywords:"phone email contact hotline guidance"},
  {title:"About the Creators", category:"Website", target:"#creators", keywords:"creators website team"}
];

const PROGRAMS = {
  ssc: {
    label:"Special Science Curriculum (SSC)",
    intro:"[EDIT] Insert the school's verified SSC description, admission details, grade levels, and curriculum highlights.",
    items:["Science and mathematics enrichment — [EDIT]","Research-oriented learning — [EDIT]","Laboratory / innovation opportunities — [EDIT]","Admission requirements — [EDIT]"]
  },
  spj: {
    label:"Special Program in Journalism (SPJ)",
    intro:"[EDIT] Insert the school's verified SPJ description, grade levels, activities, and journalism opportunities.",
    items:["Campus journalism — [EDIT]","Radio broadcasting — [EDIT]","News writing and scriptwriting — [EDIT]","Publication and media production — [EDIT]"]
  },
  shs: {
    label:"Senior High School",
    intro:"The template lists the requested Senior High School offerings below. Verify the current school offerings before public release.",
    items:["STEM — Science, Technology, Engineering and Mathematics","ASSH — [EDIT: official strand/program name]","TECHPRO — [EDIT: official strand/program name]","B&E — [EDIT: official strand/program name]"]
  }
};

const DIRECTORY = {
  teachers:{title:"Teachers Organization Chart",body:"[EDIT] Add the official school organizational chart, department heads, coordinators, and faculty directory."},
  tea:{title:"TEA",body:"[EDIT] Add the official Teachers organization/association name, officers, contact person, and activities."},
  pta:{title:"PTA",body:"[EDIT] Add the official Parent-Teacher Association officers, meetings, and contact information."},
  guidance:{title:"Guidance Counselor",body:"[EDIT] Add the counselor's verified name, office location, service hours, and contact information."},
  admin:{title:"School Administration",body:"[EDIT] Add the principal, assistant principals, department coordinators, and official office information."},
  bac:{title:"BAC",body:"[EDIT] Add the official Bids and Awards Committee composition and contact information."},
  finance:{title:"Finance Office",body:"[EDIT] Add official finance services, office hours, requirements, and contact information."},
  records:{title:"Records Office",body:"[EDIT] Add official records-request procedures, requirements, office hours, and contact information."},
  lrpo:{title:"LRPO",body:"[EDIT] Add the verified Learning Resources / Property Office name, services, and contact information."},
  prefect:{title:"Prefect",body:"[EDIT] Add the verified prefect/student welfare or discipline office details and procedures."}
};

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

function showToast(message){
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>toast.classList.remove("is-visible"), 2600);
}

function openModal(modal){
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
  const focusable = modal.querySelector("input,button,[href]");
  if(focusable) setTimeout(()=>focusable.focus(),50);
}
function closeModal(modal){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}

function renderSearch(query, container){
  const q = query.trim().toLowerCase();
  if(!q){ container.innerHTML = ""; return; }
  const matches = SEARCH_INDEX.filter(item => `${item.title} ${item.category} ${item.keywords}`.toLowerCase().includes(q)).slice(0,10);
  if(!matches.length){
    container.innerHTML = `<div class="search-empty">No matching school information found. Try another keyword.</div>`;
    return;
  }
  container.innerHTML = matches.map((item,i)=>`
    <button class="search-result" type="button" data-search-target="${item.target}" data-search-title="${item.title}">
      <span><strong>${item.title}</strong></span><small>${item.category}</small>
    </button>`).join("");
}

function goToTarget(target){
  const el = document.querySelector(target);
  if(!el) return;
  el.scrollIntoView({behavior:"smooth",block:"start"});
  closeModal($("#searchModal"));
  $("#heroSearch").value = "";
  $("#siteSearch").value = "";
  $("#heroSearchResults").innerHTML = "";
  $("#siteSearchResults").innerHTML = "";
}

function initSearch(){
  const heroSearch = $("#heroSearch");
  const siteSearch = $("#siteSearch");
  heroSearch.addEventListener("input", e=>renderSearch(e.target.value,$("#heroSearchResults")));
  siteSearch.addEventListener("input", e=>renderSearch(e.target.value,$("#siteSearchResults")));

  document.addEventListener("click", e=>{
    const result = e.target.closest("[data-search-target]");
    if(result) goToTarget(result.dataset.searchTarget);
  });

  $("#openSearch").addEventListener("click",()=>openModal($("#searchModal")));

  document.addEventListener("keydown",e=>{
    if(e.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){
      e.preventDefault(); openModal($("#searchModal"));
    }
    if(e.key === "Escape"){
      closeModal($("#searchModal")); closeModal($("#directoryModal")); closeModal($("#welcomeModal"));
      $("#editDrawer").classList.remove("is-open");
    }
  });
}

function initWelcome(){
  const modal = $("#welcomeModal");
  const seen = sessionStorage.getItem("sjnshWelcomeSeen");
  if(!seen) setTimeout(()=>openModal(modal),700);
  $$("[data-close-modal]").forEach(el=>el.addEventListener("click",()=>{
    sessionStorage.setItem("sjnshWelcomeSeen","1"); closeModal(modal);
  }));
}

function initMobileNav(){
  const toggle = $("#menuToggle"), nav = $("#mobileNav");
  toggle.addEventListener("click",()=>{
    const open = nav.classList.toggle("is-open");
    nav.style.display = open ? "block" : "";
    toggle.setAttribute("aria-expanded",String(open));
  });
  $$("#mobileNav a").forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("is-open");nav.style.display="";toggle.setAttribute("aria-expanded","false");
  }));
}

function renderProgram(key){
  const p = PROGRAMS[key];
  $("#programPanel").innerHTML = `
    <p class="eyebrow">${p.label}</p>
    <h3>${p.label}</h3>
    <p>${p.intro}</p>
    <ul>${p.items.map(item=>`<li>${item}</li>`).join("")}</ul>`;
}
function initPrograms(){
  $$(".program-tab").forEach(tab=>tab.addEventListener("click",()=>{
    $$(".program-tab").forEach(t=>{t.classList.remove("is-active");t.setAttribute("aria-selected","false")});
    tab.classList.add("is-active");tab.setAttribute("aria-selected","true");
    renderProgram(tab.dataset.program);
  }));
  renderProgram("ssc");
}

function initDirectory(){
  $$(".directory-card").forEach(card=>card.addEventListener("click",()=>{
    const item = DIRECTORY[card.dataset.directory];
    $("#directoryTitle").textContent = item.title;
    $("#directoryBody").innerHTML = `<div class="directory-detail"><h3>${item.title}</h3><p>${item.body}</p><p class="muted">Replace this placeholder with verified school information before publication.</p></div>`;
    openModal($("#directoryModal"));
  }));
  $$("[data-close-directory]").forEach(el=>el.addEventListener("click",()=>closeModal($("#directoryModal"))));
}

function initPlaceholders(){
  $$(".placeholder-button").forEach(button=>button.addEventListener("click",()=>{
    showToast("Placeholder ready — replace this with the school's verified link or document.");
  }));
}

function initEditing(){
  const drawer = $("#editDrawer");
  $("#editModeButton").addEventListener("click",()=>drawer.classList.add("is-open"));
  $("#closeEdit").addEventListener("click",()=>drawer.classList.remove("is-open"));

  $$("[data-upload-image]").forEach(input=>{
    input.addEventListener("change", e=>{
      const file = e.target.files?.[0];
      if(!file) return;
      if(!file.type.startsWith("image/")){showToast("Please choose an image file.");return;}
      const reader = new FileReader();
      reader.onload = ()=>{
        try{
          localStorage.setItem(`sjnshImage_${input.dataset.uploadImage}`, reader.result);
          applyStoredImage(input.dataset.uploadImage, reader.result);
          showToast("Image saved in this browser.");
        }catch(err){
          showToast("The image is too large for local storage. Use a smaller image.");
        }
      };
      reader.readAsDataURL(file);
    });
  });

  $("#resetLocal").addEventListener("click",()=>{
    ["hero","mantra","story","campus"].forEach(key=>localStorage.removeItem(`sjnshImage_${key}`));
    location.reload();
  });

  ["hero","mantra","story","campus"].forEach(key=>{
    const saved = localStorage.getItem(`sjnshImage_${key}`);
    if(saved) applyStoredImage(key,saved);
  });
}

function applyStoredImage(key,src){
  $$(`[data-image-key="${key}"]`).forEach(img=>img.src=src);
}

function initReveal(){
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}});
  },{threshold:.08});
  $$(".reveal").forEach(el=>observer.observe(el));
}

function initYear(){ $("#year").textContent = new Date().getFullYear(); }

document.addEventListener("DOMContentLoaded",()=>{
  initWelcome();initSearch();initMobileNav();initPrograms();initDirectory();initPlaceholders();initEditing();initReveal();initYear();
});
