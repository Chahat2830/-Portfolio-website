// =========================
// FUTURISTIC AI PORTFOLIO
// =========================

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // MOBILE MENU
  // =========================

  const menuToggle = document.querySelector(".menu-toggle");

  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // =========================
  // NAVBAR SCROLL
  // =========================

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // =========================
  // TYPING EFFECT
  // =========================

  const typedText = document.querySelector(".typed-text");

  const words = [
    "COMPUTER VISION ENGINEER",

    "AI ENGINEER",

    "CNN RESEARCHER",

    "FULL STACK DEVELOPER",

    "IOT BUILDER",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
      typedText.textContent = currentWord.substring(0, charIndex--);
    } else {
      typedText.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = deleting ? 50 : 100;

    if (!deleting && charIndex === currentWord.length) {
      deleting = true;

      speed = 1500;
    } else if (deleting && charIndex === 0) {
      deleting = false;

      wordIndex = (wordIndex + 1) % words.length;

      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // =========================
  // SCROLL REVEAL
  // =========================

  const revealItems = document.querySelectorAll(
    ".skill-card, .project-card, .stat-box, .contact-box",
  );

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    revealItems.forEach((item) => {
      const top = item.getBoundingClientRect().top;

      if (top < trigger) {
        item.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);

  revealOnScroll();

  // =========================
  // PROJECT CARD TILT
  // =========================

  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;

      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 18;

      const rotateY = (centerX - x) / 18;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0px)
      `;
    });
  });

  // =========================
  // CURSOR GLOW
  // =========================

  const glow = document.createElement("div");

  glow.classList.add("cursor-glow");

  document.body.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;

    glow.style.top = `${e.clientY}px`;
  });

  // =========================
  // CHATBOT
  // =========================

  const chatToggle = document.getElementById("chatToggle");

  const chatBox = document.getElementById("chatBox");

  const closeChat = document.getElementById("closeChat");

  const sendBtn = document.getElementById("sendMessage");

  const chatInput = document.getElementById("chatInput");

  const chatBody = document.getElementById("chatBody");

  const quickBtns = document.querySelectorAll(".quick-btn");

  // OPEN CHAT

  chatToggle.addEventListener("click", () => {
    chatBox.classList.toggle("active");
  });

  // CLOSE CHAT

  closeChat.addEventListener("click", () => {
    chatBox.classList.remove("active");
  });

  // SEND MESSAGE

  function sendMessage(message) {
    if (message.trim() === "") return;

    // USER MESSAGE

    const userDiv = document.createElement("div");

    userDiv.classList.add("user-message");

    userDiv.textContent = message;

    chatBody.appendChild(userDiv);

    // SCROLL

    chatBody.scrollTop = chatBody.scrollHeight;

    // BOT REPLY

    setTimeout(() => {
      const botDiv = document.createElement("div");

      botDiv.classList.add("bot-message");

      botDiv.innerHTML = getBotReply(message);

      chatBody.appendChild(botDiv);

      chatBody.scrollTop = chatBody.scrollHeight;
    }, 700);

    chatInput.value = "";
  }

  // SEND BUTTON

  sendBtn.addEventListener("click", () => {
    sendMessage(chatInput.value);
  });

  // ENTER KEY

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage(chatInput.value);
    }
  });

  // QUICK BUTTONS

  quickBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sendMessage(btn.textContent);
    });
  });

  // =========================
  // AI CHATBOT RESPONSES
  // =========================

  function getBotReply(message) {
    const msg = message.toLowerCase();

    // PROJECTS

    if (msg.includes("project")) {
      return `
      🚀 Featured Projects:<br><br>

      • AgroMind AI: Smart Precision Farming (IoT + LLM)<br>
      • Real-Time Mood-Based Song Recommendation System<br>
      • Animal Detection Night Vision System (ConvNeXtV2)<br>
      • Smartphone Price Prediction System<br>
      • Book Recommendation System (Collaborative + Content)<br>
      • SMS Spam Detection System (NLP)<br>
      • Corona Pandemic Analysis Dashboard<br><br>

      Main specialization:
      AI + Computer Vision + Full-Stack Data Science
      `;
    }

    // SKILLS
    else if (msg.includes("skill") || msg.includes("technology")) {
      return `
      💻 Technical Skills:<br><br>

      • Python<br>
      • SQL<br>
      • Machine Learning<br>
      • Deep Learning<br>
      • CNN Architecture<br>
      • OpenCV<br>
      • ANN<br>
      • Transfer Learning<br>
      • Git<br>
      • VS Code
      `;
    }

    // CV / RESUME
    else if (msg.includes("resume") || msg.includes("cv")) {
      return `
      📄 Resume Available.<br><br>

      Use the Resume button on homepage
      to download my complete CV.
      `;
    }

    // EXPERIENCE
    else if (msg.includes("experience")) {
      return `
      🧠 Experience:<br><br>

      • Project Assistant at NIELIT<br>
      • Teaching Support (Part-Time)<br>
      • Guided students in Python and ML<br>
      • Built AI + Computer Vision Systems
      `;
    }

    // RESEARCH
    else if (msg.includes("research") || msg.includes("paper")) {
      return `
      🔬 Research Experience:<br><br>

      Explainable Imbalance-Aware
      Facial Emotion Recognition.<br><br>

      • ConvNeXt V2-Tiny<br>
      • Grad-CAM Explainability<br>
      • Macro-F1 Score: 0.94<br>
      • Fear Class F1: 0.91
      `;
    }

    // CONTACT
    else if (msg.includes("contact") || msg.includes("email")) {
      return `
      📩 Contact Information:<br><br>

      Email:
      chahatkumar1104@email.com<br><br>

      GitHub:
      github.com/Chahat2830<br><br>

      LinkedIn:
      linkedin.com/in/chahat-kumar-34475231a
      `;
    }

    // EDUCATION
    else if (msg.includes("education") || msg.includes("study")) {
      return `
      🎓 Education:<br><br>

      
      • B.A — Delhi University SOL<br>
      • O Level — NIELIT<br>
      • A Level — NIELIT
      `;
    }

    // DEFAULT
    else {
      return `
      🤖 I can help you with:<br><br>

      • Projects<br>
      • Skills<br>
      • Research<br>
      • Experience<br>
      • Education<br>
      • Resume<br>
      • Contact
      `;
    }
  }
});
