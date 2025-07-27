// === DOM Ready ===
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const scrollBtn = document.getElementById('scrollToTopBtn');


  document.body.classList.add('dark'); // Enforce dark mode without toggle

  // === Mobile Menu Toggle ===
  menuToggle.addEventListener("change", () => {
    navLinks.style.display = menuToggle.checked ? "flex" : "none";
  });

  // Close menu on nav link click
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menuToggle.checked = false;
        navLinks.style.display = "none";
      }
    });
  });

 window.addEventListener("resize", () => {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = window.innerWidth > 768 ? "flex" : "none";
});

  // === Scroll-to-Top Button ===
  if (scrollBtn) {
    window.onscroll = () => {
      scrollBtn.style.display = (document.documentElement.scrollTop > 200) ? "block" : "none";
    };

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === Scroll Reveal for .fade-in and .about-section ===
  const fadeElements = document.querySelectorAll('.fade-in, .about-section');
  const observerOptions = { threshold: 0.1 };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => revealOnScroll.observe(el));
});
// === GSAP Animations ===
gsap.registerPlugin(ScrollTrigger);

// About section animation
gsap.from(".about-section .container", {
  scrollTrigger: ".about-section",
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out"
});

// Project tiles animation
gsap.from(".project-tile", {
  scrollTrigger: "#project-section",
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out"
});

// Hero section text
gsap.from(".hero-content h1", {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "power3.out",
  delay: 0.2
});

gsap.from(".hero-content p", {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "power3.out",
  delay: 0.6
});

gsap.from(".hero-content .cta-button", {
  opacity: 0,
  scale: 0.9,
  duration: 0.6,
  ease: "back.out(1.7)",
  delay: 1
});

// === Typing Effect ===
const typedPhrases = ["Web Developer", "UI Designer", "Creative Thinker"];
let currentPhrase = 0;
let currentChar = 0;
const typedText = document.querySelector(".typed-text");

function type() {
  if (currentChar < typedPhrases[currentPhrase].length) {
    typedText.textContent += typedPhrases[currentPhrase].charAt(currentChar);
    currentChar++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (currentChar > 0) {
    typedText.textContent = typedPhrases[currentPhrase].substring(0, currentChar - 1);
    currentChar--;
    setTimeout(erase, 50);
  } else {
    currentPhrase = (currentPhrase + 1) % typedPhrases.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typedText) type();
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

window.addEventListener("resize", () => {
  const navLinks = document.querySelector(".nav-links"); // Or your specific class
  const toggle = document.querySelector(".nav-toggle");

  // If screen is wide (e.g. desktop), ensure nav is shown
  if (window.innerWidth > 768) {
    navLinks.style.display = "flex";
  } else {
    navLinks.style.display = "none"; // Hide again on smaller screens
  }
});

