const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open)});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menú')}));const form=document.querySelector('#contact-form');form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const subject=encodeURIComponent(`Proyecto web: ${data.get('name')}`);const body=encodeURIComponent(`Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\n\n${data.get('message')}`);document.querySelector('#form-status').textContent='Abriendo tu aplicación de correo. Se abrirá un borrador de correo en tu aplicación.';window.location.href=`mailto:fsamuelatencia@gmail.com?subject=${subject}&body=${body}`});

const quoteTotal=document.querySelector('#quote-total');
const quoteLink=document.querySelector('#quote-whatsapp');
const maintenance=document.querySelector('#maintenance');
const plans=[...document.querySelectorAll('input[name="plan"]')];
const planPrices={basic:350000,professional:650000,advanced:1200000};
const money=value=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(value);
function updateQuote(){
 const selected=plans.find(input=>input.checked)?.value||'basic';
 const price=planPrices[selected];
 const maintenanceOn=Boolean(maintenance?.checked);
 if(quoteTotal)quoteTotal.textContent=money(price)+' COP';
 const names={basic:'Página web básica',professional:'Página web profesional',advanced:'Página web avanzada'};
 const maintenanceText=maintenanceOn?' Solicito también mantenimiento y soporte mensual desde $50.000 COP; confirmar precio según alcance.':' Sin mantenimiento mensual por ahora.';
 if(quoteLink){const message='Hola, quisiera cotizar una '+names[selected]+' con precio de referencia '+money(price)+' COP.'+maintenanceText+' Quisiera revisar el alcance y los requisitos.';quoteLink.href='https://wa.me/573104020228?text='+encodeURIComponent(message)}
}
plans.forEach(input=>input.addEventListener('change',updateQuote));maintenance?.addEventListener('change',updateQuote);updateQuote();