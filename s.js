const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

const API_KEY = "AIzaSyDguBtOWKfbEk5OOopHXN_wN0Hbzotiim4"; // Replace with your new API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const featureData = {
    "program_information": "We offer a variety of undergraduate and postgraduate programs, including specializations in engineering, business, and science. Admissions deadlines vary by program. Please visit our program page for more information.",
    "admission_process": "The admission process includes submission of an application, entrance exam, and interviews. Documents such as transcripts, identity proof, and test scores are required.",
    "scholarships": "We offer scholarships based on merit and financial need. Please check the scholarships page for eligibility and application details.",
    "campus_info": "Our campus has state-of-the-art libraries, labs, and sports facilities. Accommodation options include hostels and nearby apartments.",
    "fee_structure": "Our fee structure varies by program. Payments can be made in installments, and we offer online payment options. Late fees may apply after the due date.",
    "events": "Upcoming events include our Open House and the Career Fair. Be sure to check our calendar for details.",
    "placement": "We have a strong placement record, with top recruiters like Google, Microsoft, and Amazon. Internship opportunities are available with many of our industry partners.",
    "faculty": "Our faculty members are experts in their fields, with many holding advanced degrees and significant industry experience.",
    "international_students": "International students are welcome! We offer support with visas, housing, and English language courses.",
    "campus_tours": "You can schedule a campus tour through our website. Virtual tours are also available.",
    "application_tracking": "You can track your application status online by logging into your account.",
    "course_selection": "Students can select courses online during the registration period. Timetables and credit details are provided.",
    "notifications": "You will receive notifications for deadlines, fee payments, and exam schedules through your registered email.",
    "faqs": "Check our FAQ section for common questions about admission, fees, and programs.",
    "exam_results": "Exam results are posted online, and students can download their transcripts from the student portal.",
    "multi_language": "Our chatbot supports multiple languages. Type your query in your preferred language!",
    "contact_support": "For further assistance, contact us at support@college.edu or call our helpline at 123-456-7890."
};

// Create chat <li> element with message and class
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

// Simulated response to handle feature-based queries
const generateFeatureResponse = (userMessage) => {
    // Simulate a response by checking the user's message for keywords related to features
    userMessage = userMessage.toLowerCase();
    if (userMessage.includes("program")) return featureData.program_information;
    if (userMessage.includes("admission")) return featureData.admission_process;
    if (userMessage.includes("scholarships")) return featureData.scholarships;
    if (userMessage.includes("campus")) return featureData.campus_info;
    if (userMessage.includes("fee")) return featureData.fee_structure;
    if (userMessage.includes("events")) return featureData.events;
    if (userMessage.includes("placement")) return featureData.placement;
    if (userMessage.includes("faculty")) return featureData.faculty;
    if (userMessage.includes("international")) return featureData.international_students;
    if (userMessage.includes("tour")) return featureData.campus_tours;
    if (userMessage.includes("track")) return featureData.application_tracking;
    if (userMessage.includes("course")) return featureData.course_selection;
    if (userMessage.includes("notification")) return featureData.notifications;
    if (userMessage.includes("faq")) return featureData.faqs;
    if (userMessage.includes("exam")) return featureData.exam_results;
    if (userMessage.includes("language")) return featureData.multi_language;
    if (userMessage.includes("contact")) return featureData.contact_support;
    
    return "I'm not sure about that. Can you please clarify?";
};

// Handle the chat and append it to the chatbox
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append user message to chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Generate a feature-based response
    setTimeout(() => {
        const incomingChatLi = createChatLi(generateFeatureResponse(userMessage), "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
};

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
