const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open)});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menú')}));const form=document.querySelector('#contact-form');form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const subject=encodeURIComponent(`Proyecto web: ${data.get('name')}`);const body=encodeURIComponent(`Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\n\n${data.get('message')}`);document.querySelector('#form-status').textContent='Abriendo tu aplicación de correo. Se abrirá un borrador de correo en tu aplicación.';window.location.href=`mailto:fsamuelatencia@gmail.com?subject=${subject}&body=${body}`});

const siteType=document.querySelector('#site-type');
const quoteTotal=document.querySelector('#quote-total');
const quoteLink=document.querySelector('#quote-whatsapp');
const quoteInputs=[...document.querySelectorAll('.quote-option input')];
const basePrices={business:1000000,shop:1200000,restaurant:1000000};
const extraPrices={catalog:400000,booking:350000,admin:1000000,commerce:2000000,users:1000000,qr:250000,seo:350000};
const money=value=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(value);
function updateQuote(){
 const base=basePrices[siteType?.value]||basePrices.business;
 const selected=quoteInputs.filter(input=>input.checked);
 const total=base+selected.reduce((sum,input)=>sum+(extraPrices[input.value]||0),0);
 if(quoteTotal)quoteTotal.textContent=money(total)+' COP';
 const labels={business:'empresa o negocio de servicios',shop:'tienda o establecimiento',restaurant:'restaurante o cafetería'};
 const extras=selected.map(input=>input.closest('label').querySelector('b').textContent);
 const message='Hola, quisiera cotizar una página web. Tipo de negocio: '+(labels[siteType?.value]||labels.business)+'. Funciones seleccionadas: '+(extras.length?extras.join(', '):'sitio base sin adicionales')+'. Estimado mostrado: '+money(total)+' COP. Quisiera revisar el alcance y los requisitos.';
 if(quoteLink)quoteLink.href='https://wa.me/573104020228?text='+encodeURIComponent(message);
}
siteType?.addEventListener('change',updateQuote);quoteInputs.forEach(input=>input.addEventListener('change',updateQuote));updateQuote();
