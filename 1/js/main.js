let activeUnit=1;
const completed=JSON.parse(localStorage.getItem("portfolioCompleted")||"[]");
const $=s=>document.querySelector(s);

function save(){localStorage.setItem("portfolioCompleted",JSON.stringify(completed)); updateProgress();}
function key(u,w,a){return `${u}-${w}-${a}`}
function isDone(k){return completed.includes(k)}
function toggleDone(k){const i=completed.indexOf(k);i>=0?completed.splice(i,1):completed.push(k);save();renderWeeks();toast(i>=0?"Actividad marcada como pendiente":"¡Actividad completada! ✓")}

function updateProgress(){
 const total=32, pct=Math.round(completed.length/total*100);
 $("#progressValue").textContent=pct+"%"; $("#progressText").textContent=pct+"% completado";
}
function renderTabs(){
 $("#unitTabs").innerHTML=portfolioData.map(u=>`<button class="unit-tab ${u.id===activeUnit?"active":""}" data-unit="${u.id}">${u.name}</button>`).join("");
 document.querySelectorAll(".unit-tab").forEach(b=>b.onclick=()=>{activeUnit=+b.dataset.unit;renderTabs();renderWeeks()});
}
function renderWeeks(){
 const q=$("#searchInput").value.toLowerCase().trim(), filter=$("#statusFilter").value;
 const unit=portfolioData.find(u=>u.id===activeUnit);
 let html="";
 unit.weeks.forEach(w=>{
   const acts=w.activities.map((name,a)=>({name,a,done:isDone(key(unit.id,w.n,a))})).filter(x=>{
     const match=!q||`${w.title} ${x.name} ${unit.name}`.toLowerCase().includes(q);
     return match&&(filter==="all"||(filter==="done"&&x.done)||(filter==="pending"&&!x.done));
   });
   if(!acts.length)return;
   html+=`<article class="week-card"><div class="week-top"><span class="week-number">SEMANA ${w.n}</span><span class="week-number">${unit.theme}</span></div><h3>${w.title}</h3>${acts.map(x=>`
    <div class="activity"><button class="check ${x.done?"done":""}" data-check="${key(unit.id,w.n,x.a)}">${x.done?"✓":""}</button><div class="activity-info"><b>${x.name}</b><small>Actividad ${x.a+1} · Evidencia académica</small></div><button class="open-task" data-task='${JSON.stringify({u:unit.name,w:w.n,title:w.title,a:x.name,d:w.details[x.a]}).replace(/'/g,"&#39;")}'>Ver →</button></div>`).join("")}</article>`;
 });
 $("#weeksGrid").innerHTML=html||`<div class="glass" style="grid-column:1/-1;text-align:center">No se encontraron actividades con esos filtros.</div>`;
 document.querySelectorAll("[data-check]").forEach(b=>b.onclick=()=>toggleDone(b.dataset.check));
 document.querySelectorAll(".open-task").forEach(b=>b.onclick=()=>openTask(JSON.parse(b.dataset.task)));
}
function openTask(t){
 $("#modalContent").innerHTML=`<span class="eyebrow">${t.u} · SEMANA ${t.w}</span><h2>${t.title}</h2><h3>${t.a}</h3><p>${t.d}</p><div class="glass" style="margin-top:20px"><b>📌 Aquí puedes colocar:</b><p style="margin-bottom:0">PDF, enlace a GitHub, imagen, documento, presentación o descripción de tu evidencia.</p></div>`;
 $("#taskModal").classList.add("show");
}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
$("#modalClose").onclick=()=>$("#taskModal").classList.remove("show");
$("#taskModal").onclick=e=>{if(e.target.id==="taskModal")$("#taskModal").classList.remove("show")};
$("#searchInput").oninput=renderWeeks; $("#statusFilter").onchange=renderWeeks;
$("#themeBtn").onclick=()=>{document.body.classList.toggle("light");$("#themeBtn").textContent=document.body.classList.contains("light")?"☀":"☾";localStorage.setItem("theme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("theme")==="light"){document.body.classList.add("light");$("#themeBtn").textContent="☀"}
$("#menuBtn").onclick=()=>{const n=$("#nav");n.style.display=n.style.display==="flex"?"none":"flex"};
renderTabs();renderWeeks();updateProgress();
