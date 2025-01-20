const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
}

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = ""; // Clear input field
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(userMessage, incomingChatLi);
  }, 600);
}

const generateResponse = (userMessage, chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Example responses based on user input
  let response = "";

  if (/program|course/i.test(userMessage)) {
    response = "We offer various programs such as B.Tech, M.Tech, MBA, and PhD with specializations in Engineering, Science, and Management.";
  } else if (/admission/i.test(userMessage)) {
    response = "For admission, please submit an application online. Eligibility: 10+2 for UG, relevant Bachelor's degree for PG. Deadlines vary by program.";
  } else if (/scholarship/i.test(userMessage)) {
    response = "We offer merit-based and need-based scholarships. You can apply through the scholarships section of our website.";
  } else if (/campus/i.test(userMessage)) {
    response = "Our campus has modern labs, a library, sports facilities, hostels, and a vibrant campus life.";
  } else if (/fee/i.test(userMessage)) {
    response = "The fee structure varies by program. UG courses start at $5000 per year. Payment options include online and offline.";
  } else if (/placement/i.test(userMessage)) {
    response = "We have a dedicated placement cell with 90% placement rates in companies like Google, Microsoft, and Amazon.";
  } else if (/faculty/i.test(userMessage)) {
    response = "Our faculty includes experienced professors with PhDs from leading institutions. Check our website for more info.";
  } else if (/international/i.test(userMessage)) {
    response = "We offer support for international students including visa assistance, language courses, and cultural programs.";
  } else {
    response = "Sorry, I couldn't understand that. Could you please rephrase your query?";
  }

  messageElement.textContent = response;
  chatbox.scrollTo(0, chatbox.scrollHeight);
}

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
