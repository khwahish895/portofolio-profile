(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const r=document.getElementById("hamburger"),d=document.getElementById("nav-menu"),g=document.querySelectorAll(".nav-link"),b=document.querySelectorAll(".section"),m=document.getElementById("scrollTop"),p=document.getElementById("loading-screen"),u=document.getElementById("notification"),L=document.getElementById("notificationText"),w=document.getElementById("closeNotification"),l=document.getElementById("contactForm"),y=document.querySelectorAll(".tab-btn"),S=document.querySelectorAll(".tab-content"),k=document.getElementById("downloadCV");window.addEventListener("load",()=>{setTimeout(()=>{p.style.opacity="0",setTimeout(()=>{p.style.display="none"},500)},1500)});r&&d&&r.addEventListener("click",()=>{d.classList.toggle("active"),r.classList.toggle("active")});function c(e){b.forEach(t=>{t.classList.remove("active")});const n=document.getElementById(e);n&&n.classList.add("active"),g.forEach(t=>{t.classList.remove("active"),t.dataset.section===e&&t.classList.add("active")}),d.classList.remove("active"),window.scrollTo({top:0,behavior:"smooth"})}g.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault();const t=e.dataset.section;c(t)})});document.querySelectorAll("[data-section]").forEach(e=>{e.addEventListener("click",n=>{if(e.tagName==="BUTTON"){n.preventDefault();const t=e.dataset.section;c(t)}})});document.addEventListener("keydown",e=>{const n={1:"home",2:"about",3:"education",4:"skills",5:"projects",6:"certificates",7:"contact"};n[e.key]&&c(n[e.key])});y.forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.tab;y.forEach(t=>t.classList.remove("active")),S.forEach(t=>t.classList.remove("active")),e.classList.add("active"),document.getElementById(n).classList.add("active")})});window.addEventListener("scroll",()=>{window.pageYOffset>300?m.classList.add("visible"):m.classList.remove("visible")});m.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});function A(){const e=document.querySelectorAll(".skill-progress"),n=new IntersectionObserver(t=>{t.forEach(i=>{if(i.isIntersecting){const o=i.target,s=o.dataset.width;o.style.width=s}})},{threshold:.5});e.forEach(t=>n.observe(t))}A();k.addEventListener("click",e=>{e.preventDefault();const n=document.createElement("a"),t=`
KHWAHISH SINGH
DevOps Engineer & Full Stack Developer

Contact Information:
Email: khwahishsingh2005@gmail.com
Phone: 7424988589
LinkedIn: https://www.linkedin.com/in/khwahish-singh-997628295
GitHub: https://github.com/khwahish895

Education:
• B.Tech Computer Science - Jaipur Engineering College & Research Centre (Pursuing)
• 12th Grade - TGM Public Sr. Sec. School (RBSE) - 65.20%
• 10th Grade - IGM Public Sr. Sec. School (RBSE) - 93%

Technical Skills:
• Programming: Python, JavaScript, HTML, CSS, PHP, SQL
• DevOps & Cloud: Docker, Kubernetes, Jenkins, AWS, GitHub Actions
• AI & ML: Streamlit, Generative AI, Machine Learning, Data Analysis
• Tools: Linux/RHEL 9, Git, Bash, Terraform, React, Node.js

Experience:
• Internship at Linux World - Docker, Jenkins, Gen-technologies

Certifications:
• Android App Development
• Data Science
• Python Programming
• Cyber Security
• MySQL Database
• And more...

Projects:
• Streamlit Data Visualization App
• Gradio + Gemini AI Integration
• College Website
• Various Games (Tic-Tac-Toe, Snake, etc.)
• And many more...
    `,i=new Blob([t],{type:"text/plain"}),o=window.URL.createObjectURL(i);n.href=o,n.download="Khwahish_Singh_CV.txt",document.body.appendChild(n),n.click(),document.body.removeChild(n),window.URL.revokeObjectURL(o),h("CV downloaded successfully! 📄")});l.addEventListener("submit",e=>{e.preventDefault();const n=new FormData(l),t=n.get("name"),i=n.get("email"),o=n.get("subject"),s=n.get("message"),a=`Name: ${t}%0D%0AEmail: ${i}%0D%0A%0D%0AMessage:%0D%0A${s}`,f=`mailto:khwahishsingh2005@gmail.com?subject=${encodeURIComponent(o)}&body=${a}`;try{window.open(f,"_blank")}catch{window.location.href=f}h("📧 Email client opened! Please send the email from your email application."),l.reset()});function h(e){L.textContent=e,u.classList.add("show"),setTimeout(()=>{u.classList.remove("show")},5e3)}w.addEventListener("click",()=>{u.classList.remove("show")});document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(n){n.preventDefault();const t=this.getAttribute("href");if(t&&t!=="#"&&t.length>1){const i=document.querySelector(t);i&&i.scrollIntoView({behavior:"smooth",block:"start"})}else window.scrollTo({top:0,behavior:"smooth"})})});document.querySelectorAll('a[target="_blank"]').forEach(e=>{e.addEventListener("click",()=>{h("Opening external link...")})});function I(){const e=document.querySelector(".animated-name");e&&(e.style.animationDelay="0.5s")}setTimeout(I,1e3);function x(){const e=document.getElementById("animatedName");e&&(e.style.animation="slideInRightToLeft 2s ease-out, circularRotation 2s ease-out, textGlow 3s ease-in-out infinite alternate")}function B(){const e={threshold:.3,rootMargin:"0px 0px -100px 0px"},n=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting&&i.target.classList.add("animate")})},e);document.querySelectorAll(".scroll-animate").forEach(t=>{n.observe(t)})}function v(){document.querySelectorAll(".particle").forEach((n,t)=>{const i=Math.random()*window.innerWidth,o=Math.random()*window.innerHeight;n.style.left=i+"px",n.style.top=o+"px",n.style.animationDelay=t*.5+"s"})}v();window.addEventListener("resize",()=>{v()});document.querySelectorAll(".project-card").forEach(e=>{e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-10px) scale(1.02)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0) scale(1)"})});document.querySelectorAll(".certificate-card").forEach(e=>{e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-8px) rotateY(5deg)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0) rotateY(0deg)"})});document.querySelectorAll("button, .btn-primary, .btn-secondary, .btn-link").forEach(e=>{e.addEventListener("click",function(n){const t=document.createElement("span"),i=this.getBoundingClientRect(),o=Math.max(i.width,i.height),s=n.clientX-i.left-o/2,a=n.clientY-i.top-o/2;t.style.width=t.style.height=o+"px",t.style.left=s+"px",t.style.top=a+"px",t.classList.add("ripple"),this.appendChild(t),setTimeout(()=>{t.remove()},600)})});const E=document.createElement("style");E.textContent=`
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .btn-primary, .btn-secondary, .btn-link {
        position: relative;
        overflow: hidden;
    }
`;document.head.appendChild(E);document.addEventListener("DOMContentLoaded",()=>{c("home"),x(),B(),document.body.style.transition="all 0.3s ease",console.log("🚀 Khwahish Singh Portfolio Loaded Successfully!"),console.log("💡 Use keyboard shortcuts 1-7 to navigate between sections"),console.log("🎨 Enjoy the neon-themed experience!")});
