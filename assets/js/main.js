/* ==========================================================================
   PHASE 4 & 13 — USER INTERACTION CONTROLLER (FAIL-SAFE NEURAL ROUTER)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Nav Toggle Mechanics
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Navbar Scroll Dynamic Layering
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ==========================================================================
  // ARCHITECTURAL CHATBOT NETWORKING LOGIC
  // ==========================================================================
  const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendMessage");
  const chatInput = document.getElementById("chatInput");
  const chatBody = document.getElementById("chatBody");
  const quickBtns = document.querySelectorAll(".quick-suggest-btn");

  chatToggle.addEventListener("click", () =>
    chatBox.classList.toggle("active"),
  );
  closeChat.addEventListener("click", () => chatBox.classList.remove("active"));

  async function handleOutgoingMessage(text) {
    if (!text.trim()) return;

    // 1. Output User Input Bubble
    const userBubble = document.createElement("div");
    userBubble.classList.add("user-msg-bubble");
    userBubble.textContent = text;
    chatBody.appendChild(userBubble);
    chatBody.scrollTop = chatBody.scrollHeight;

    chatInput.value = "";

    // 2. Insert Temporary Typing Indicator Bubble
    const typingBubble = document.createElement("div");
    typingBubble.classList.add("bot-msg-bubble");
    typingBubble.id = "grok-typing-indicator";
    typingBubble.innerHTML = "<span>🤖 Thinking...</span>";
    chatBody.appendChild(typingBubble);
    chatBody.scrollTop = chatBody.scrollHeight;

    // 3. Request Token Stream via Transparent Fail-safe Hybrid Routing
    const botReplyHTML = await queryNeuralReply(text);

    // 4. Tear Down Typing Indicator and Render Real Response
    const indicator = document.getElementById("grok-typing-indicator");
    if (indicator) indicator.remove();

    const botBubble = document.createElement("div");
    botBubble.classList.add("bot-msg-bubble");
    botBubble.innerHTML = botReplyHTML;
    chatBody.appendChild(botBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  sendBtn.addEventListener("click", () =>
    handleOutgoingMessage(chatInput.value),
  );
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleOutgoingMessage(chatInput.value);
  });

  quickBtns.forEach((btn) => {
    btn.addEventListener("click", () => handleOutgoingMessage(btn.textContent));
  });

  // HYBRID ROUTER (TRIES GROK API FIRST -> FALLS BACK TO LOCAL EXPERT PARSER)
  async function queryNeuralReply(userInputText) {
    // ⚠️ Place your real key here if you want Grok live generation.
    const XAI_API_KEY = "ai_your_actual_secure_grok_api_token_here";

    // Check if the key is still a placeholder string
    const isPlaceholder = XAI_API_KEY.includes("your_actual_secure");

    if (!isPlaceholder) {
      const SYSTEM_PROMPT = `
        You are Chahat's Portfolio Assistant. Answer professionally, intelligently, and concisely.
        Use this context to answer user questions accurately:
        - Completed B.A. from Delhi University SOL and NIELIT Advanced 'A' Level & 'O' Level certifications.
        - Specializes in Computer Vision, CNN architectures, real-time vision systems, and intelligent automation[cite: 4, 5].
        - First author on research involving explainable FER using ConvNeXt V2-Tiny, Class-Weighted Focal Loss, and Grad-CAM layers at NIELIT Delhi[cite: 4, 5]. Outperformed DenseNet121 and EfficientNetV2 with a macro-F1 score of 0.94[cite: 4].
        - Developed notable projects like a Real-Time Facial Emotion Recognition System, AgroMind AI Precision Agriculture, a Nocturnal Thermal Animal Detector, a Book Recommender, and an SMS Spam Detection System[cite: 4, 5].
        Keep answers short and formatted for clean web presentation using bold tags and breaks. Do not mention system context or leak the API key.
      `;

      const targetUrl = "https://api.x.ai/v1/chat/completions";
      const proxyEndpoint = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

      try {
        const response = await fetch(proxyEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${XAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "grok-2-latest",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: userInputText },
            ],
            temperature: 0.3,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          let formattedText = data.choices[0].message.content
            .replace(/\n/g, "<br>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>");
          return formattedText;
        } else {
          console.warn(
            `Proxy API returned status ${response.status}. Dropping to high-fidelity local matrix.`,
          );
        }
      } catch (error) {
        console.error("API Fetch Gateway timed out or was blocked:", error);
      }
    }

    // ==========================================================================
    // BACKUP EXPERT MATRICES (Instant response if API is offline or key is blank)
    // ==========================================================================
    const cleanStr = userInputText.toLowerCase();

    if (cleanStr.includes("project")) {
      return `<strong>🚀 Core Production Modules:</strong><br><br>
              • <strong>Real-Time Facial Emotion Recognition System:</strong> End-to-end vision pipeline using custom CNN configurations and optimized OpenCV streams[cite: 4, 5].<br>
              • <strong>AgroMind AI:</strong> Precision agriculture binding hardware metrics with Llama 3 reasoning via FastAPI.<br>
              • <strong>Nocturnal Thermal Animal Detector:</strong> Computer vision inference utilizing ConvNeXtV2 optimized through ONNX Runtime for low-light bands.<br>
              • <strong>Book Recommender System:</strong> Deploying content-based similarity matching calculations[cite: 5].<br>
              • <strong>SMS Spam Detection System:</strong> NLP text classification network using tokenization and supervised binary profiling[cite: 5].`;
    }
    if (cleanStr.includes("skill") || cleanStr.includes("technology")) {
      return `<strong>💻 Technical Engineering Toolset:</strong><br><br>
              • <strong>Programming & Core Data:</strong> Python, SQL[cite: 4, 5]<br>
              • <strong>Deep Learning Array:</strong> ANN, CNN, Transfer Learning, Hyperparameter Tuning[cite: 4, 5]<br>
              • <strong>Computer Vision:</strong> OpenCV, Image Preprocessing, Face Detection, Facial Expression Matrix[cite: 4, 5]<br>
              • <strong>Data Visualization:</strong> Matplotlib, Seaborn, Interactive Dashboard Development[cite: 5]`;
    }
    if (cleanStr.includes("research") || cleanStr.includes("paper")) {
      return `<strong>🔬 Active Neural Investigation (First Author):</strong><br><br>
              Published under the <strong>National Institute of Electronics and Information Technology (NIELIT), Delhi</strong>[cite: 4, 5].<br><br>
              • <strong>Title:</strong> Explainable Imbalance-Aware Facial Emotion Recognition[cite: 4, 5]<br>
              • <strong>Topology:</strong> ConvNeXt V2-Tiny Backbone with self-supervised FCMAE pretraining[cite: 4].<br>
              • <strong>Optimization:</strong> Addressed severe class skew using Class-Weighted Focal Loss (Fear class F1-score: 0.91)[cite: 4].<br>
              • <strong>Explainability:</strong> Integrated Grad-CAM visualization for neural transparency validation[cite: 4, 5].<br>
              • <strong>Benchmark:</strong> Achieved a <strong>0.94 Macro-F1 score</strong>, actively outperforming DenseNet121 and EfficientNetV2[cite: 4].`;
    }
    if (cleanStr.includes("contact") || cleanStr.includes("email")) {
      return `<strong>📩 Secure Communication Nodes:</strong><br><br>
              • <strong>Email Direct:</strong> <a href="mailto:chahatkumar1104@gmail.com">chahatkumar1104@gmail.com</a>[cite: 4, 5]<br>
              • <strong>GitHub Network:</strong> <a href="https://github.com/Chahat2830" target="_blank">github.com/Chahat2830</a>[cite: 4, 5]<br>
              • <strong>LinkedIn Connection:</strong> <a href="https://www.linkedin.com/in/chahat-kumar-34475231a/" target="_blank">linkedin.com/in/chahat-kumar-34475231a</a>[cite: 4, 5]`;
    }

    return `🤖 <strong>Portfolio Assistant Matrix Online.</strong><br><br>
            I can talk fluently about Chahat's engineering profile. Try asking about my <strong>Projects</strong>, technical <strong>Skills</strong>, or formal AI <strong>Research</strong> milestones!`;
  }
});
