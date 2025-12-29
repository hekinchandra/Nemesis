/**
 * NEMESIS GROUP HOLDINGS - INTERACTIVE ENGINE
 * Fokus: Counter Animation, Typing Effect, & Parallax Enhancer
 */

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // posisi x mouse di dalam kartu
    const y = e.clientY - rect.top; // posisi y mouse di dalam kartu

    // Hitung rotasi berdasarkan posisi mouse
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0) scale(1)`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. ANIMASI ANGKA (COUNTER) ---
  // Membuat angka statistik berjalan naik saat terlihat di layar
  const stats = document.querySelectorAll(".stat-item h3");

  const animateCounter = (el) => {
    const target = parseFloat(el.innerText.replace(/[^0-9.]/g, ""));
    const suffix = el.innerText.replace(/[0-9.]/g, ""); // Ambil simbol seperti +, $, B, k
    let count = 0;
    const speed = 2000 / target; // Durasi total 2 detik

    const updateCount = () => {
      count += target / 100;
      if (count < target) {
        el.innerText = Math.floor(count) + suffix;
        setTimeout(updateCount, 20);
      } else {
        el.innerText = target + suffix;
      }
    };
    updateCount();
  };

  // Observer khusus untuk angka agar animasi hanya jalan sekali saat di-scroll
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          animateCounter(entry.target.querySelector("h3"));
          entry.target.dataset.animated = true; // Kunci agar tidak animasi ulang
        }
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelectorAll(".stat-item")
    .forEach((item) => statsObserver.observe(item));

  // --- 2. EFEK TEKS MENGETIK (TYPING EFFECT) ---
  // Memberikan kesan dinamis pada slogan "Dominance"
  const words = ["Dominance", "Innovation", "Efficiency", "Sustainability"];
  let i = 0;
  let j = 0;
  let currentWord = "";
  let isDeleting = false;
  const typingTarget = document.querySelector(".hero h1 span");

  function type() {
    currentWord = words[i];
    if (isDeleting) {
      j--;
    } else {
      j++;
    }

    typingTarget.innerText = currentWord.substring(0, j);

    if (!isDeleting && j === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 2000); // Diam sebentar setelah selesai mengetik
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 50 : 150);
    }
  }

  // Mulai efek ketik setelah animasi hero selesai (delay 1.5s)
  setTimeout(type, 1500);

  // --- 3. CUSTOM MOUSE TRAIL (PREMIUM TOUCH) ---
  // Memberikan sedikit efek cahaya yang mengikuti mouse (opsional tapi keren)
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Mengatur posisi gradient cahaya di CSS (kalau kamu mau tambah efek spot)
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  console.log("Nemesis Engine: Online & Ready.");
});
