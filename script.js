'use strict';
const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && navigation?.classList.contains('open')){closeMenu();menu.focus();}});
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
const floating=document.querySelector('.floating-contact');
function updateContact(){if(!hero||!floating||!header)return;const show=hero.getBoundingClientRect().bottom<=header.getBoundingClientRect().bottom;floating.classList.toggle('visible',show);floating.setAttribute('aria-hidden',String(!show));floating.inert=!show;}
window.addEventListener('scroll',updateContact,{passive:true});
window.addEventListener('resize',()=>{updateContact();if(window.innerWidth>760&&navigation)closeMenu();});
updateContact();
const form=document.querySelector('#enquiry-form');
const service=document.querySelector('#service');
if(service){const requested=new URLSearchParams(window.location.search).get('service');if(requested)service.value=requested.slice(0,160);}
function buildEnquiry(data){return `Hi Kieran, I’m interested in renting a local website through Get My Leads.\n\nName: ${data.name.trim()}\nBusiness: ${data.business.trim()}\nService: ${data.service.trim()}\nTarget town/area: ${data.area.trim()}${data.details.trim()?'\nAdditional details: '+data.details.trim():''}\n\nCould you let me know what websites are available for my service and area, the monthly rental cost and the terms?`;}
form?.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));const url='https://wa.me/447367856186?text='+encodeURIComponent(buildEnquiry(data));window.location.assign(url);});
