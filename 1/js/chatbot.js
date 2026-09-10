const chatToggle=document.getElementById("chatToggle"),chatPanel=document.getElementById("chatPanel"),chatClose=document.getElementById("chatClose"),chatForm=document.getElementById("chatForm"),chatInput=document.getElementById("chatInput"),chatMessages=document.getElementById("chatMessages");
function addMsg(text,type){const d=document.createElement("div");d.className=`msg ${type}`;d.textContent=text;chatMessages.appendChild(d);chatMessages.scrollTop=chatMessages.scrollHeight}
function answer(q){
 q=q.toLowerCase();
 if(q.includes("unidad")){const u=portfolioData.find(x=>q.includes(String(x.id)));return u?`${u.name}: ${u.theme}. Contiene 4 semanas y 8 actividades.`:"Tengo 4 unidades. Prueba preguntando por 'unidad 1', 'unidad 2', etc."}
 if(q.includes("semana")){const m=q.match(/semana\s*(\d+)/);if(m){const n=+m[1],u=portfolioData.find(x=>x.weeks.some(w=>w.n===n)),w=u?.weeks.find(x=>x.n===n);return w?`Semana ${n}: ${w.title}. Actividades: ${w.activities.join(" y ")}.`:"No encontré esa semana."}}
 if(q.includes("pendiente"))return `Tienes ${32-completed.length} actividades pendientes y ${completed.length} completadas.`;
 if(q.includes("hola")||q.includes("ayuda"))return "¡Hola! 👋 Puedo decirte qué actividades hay por unidad o semana y cuántas tienes pendientes.";
 return "Puedo ayudarte con: unidad 1, semana 5, actividades pendientes o información del portafolio.";
}
chatToggle.onclick=()=>chatPanel.classList.toggle("show");chatClose.onclick=()=>chatPanel.classList.remove("show");
chatForm.onsubmit=e=>{e.preventDefault();const q=chatInput.value.trim();if(!q)return;addMsg(q,"user");chatInput.value="";setTimeout(()=>addMsg(answer(q),"bot"),250)}
