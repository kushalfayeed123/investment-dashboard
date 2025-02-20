// src/app/chatbot/chatbot.component.ts
import { Component, Input, OnInit } from "@angular/core";

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"],
})
export class ChatbotComponent implements OnInit {
  // Optionally receive user data from the app (e.g., name, email, phone)
  @Input() userData: {
    name?: string;
    email?: string;
    phone?: string;
  } | null = null;

  // Maintain the conversation history
  messages: ChatMessage[] = [];
  // The current user input from the chatbot text field
  userInput: string = "";
  // Chatbot state: collecting enquiry details or finished
  collecting: boolean = true;
  // To track which step the chatbot is at
  step: number = 0;

  // Pre-defined questions to ask if we don’t have enough details
  questions: string[] = [
    "Please briefly describe your investment enquiry.",
    "Do you have any specific questions about your portfolio?",
    "Would you like to add any further details?",
  ];

  ngOnInit() {
    // If user data is available, greet the user by name
    const welcomeMsg =
      this.userData && this.userData.name
        ? `Hi ${this.userData.name}, I’m here to help you with your investment enquiry.`
        : `Hi, I’m here to help with your investment enquiry.`;
    this.addBotMessage(welcomeMsg);
    this.askNextQuestion();
  }

  addBotMessage(message: string) {
    this.messages.push({ from: "bot", text: message });
  }

  addUserMessage(message: string) {
    this.messages.push({ from: "user", text: message });
  }

  askNextQuestion() {
    if (this.step < this.questions.length) {
      this.addBotMessage(this.questions[this.step]);
    } else {
      // End of data collection: hand off to live chat
      this.addBotMessage(
        "Thank you! Please hold on while I connect you to a live agent."
      );
      this.collecting = false;
      // Pre-populate visitor info if available
      if (this.userData && (window as any).Tawk_API) {
        (window as any).Tawk_API.setAttributes(
          {
            name: this.userData.name,
            email: this.userData.email,
            phone: this.userData.phone,
            enquiry: this.messages
              .filter((m) => m.from === "user")
              .map((m) => m.text)
              .join(" | "),
          },
          function (error: any) {
            console.log("Tawk.to attribute error:", error);
          }
        );
      }
      // Trigger the live chat widget (maximize the widget)
      setTimeout(() => {
        if (
          (window as any).Tawk_API &&
          typeof (window as any).Tawk_API.maximize === "function"
        ) {
          (window as any).Tawk_API.maximize();
        }
      }, 500);
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add the user's response to the conversation
    const message = this.userInput.trim();
    this.addUserMessage(message);
    this.userInput = "";

    if (this.collecting) {
      // Move to the next step in the conversation
      this.step++;
      // Ask the next question (if any)
      setTimeout(() => this.askNextQuestion(), 1000);
    }
  }

  // Optionally allow toggling the chatbot UI open/closed
  isOpen: boolean = true;
  toggleChat() {
    this.isOpen = !this.isOpen;
  }
}
