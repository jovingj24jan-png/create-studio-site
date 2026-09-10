/* Case-study motion. Mirrors the reveal system in index.html so both
   documents behave identically: one observer for viewport reveals, a
   count-up for result figures, and a header that retracts on scroll-down. */
(function(){
"use strict";

var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ── viewport reveals ────────────────────────────────────────────────── */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
  });
},{threshold:.12, rootMargin:"0px 0px -8% 0px"});

document.querySelectorAll(".rv,.mask,.imgbox,.clip,.case-next")
  .forEach(function(el){ io.observe(el) });

/* stagger sibling reveals inside a block rather than firing them together */
document.querySelectorAll("section").forEach(function(sec){
  sec.querySelectorAll(".rv").forEach(function(el,i){
    el.style.transitionDelay = Math.min(i,5)*90 + "ms";
  });
});

/* ── result figures ──────────────────────────────────────────────────── */
var cio = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting) return;
    cio.unobserve(e.target);
    var el  = e.target,
        to  = parseFloat(el.dataset.to) || 0,
        dec = parseInt(el.dataset.dec || "0", 10),
        sfx = el.dataset.suffix || "";
    if(reduce.matches){ el.textContent = to.toFixed(dec) + sfx; return }
    var t0 = performance.now(), dur = 1900;
    (function step(t){
      var p = Math.min(1,(t-t0)/dur),
          v = to * (1 - Math.pow(1-p,4));
      el.textContent = v.toFixed(dec) + sfx;
      if(p < 1) requestAnimationFrame(step);
    })(t0);
  });
},{threshold:.4});
document.querySelectorAll(".count").forEach(function(el){ cio.observe(el) });

/* ── header retract ──────────────────────────────────────────────────── */
var hdr = document.getElementById("hdr"), last = window.scrollY;
window.addEventListener("scroll", function(){
  var y = window.scrollY;
  hdr.classList.toggle("hide", y > 260 && y > last);
  last = y;
},{passive:true});

})();
