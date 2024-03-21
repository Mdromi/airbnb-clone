import { Controller } from "@hotwired/stimulus";
import axios from "axios";
import { leave } from "el-transition";

export default class extends Controller {
  static targets = [
    "name", "nameWrapper", "invalidSvgName", "nameLabel", "nameErrorMessage",
    "email", "emailWrapper", "invalidSvgEmail", "emailLabel", "emailErrorMessage",
    "password", "passwordWrapper", "invalidSvgPassword", "passwordLabel", "passwordErrorMessage",
    "submit", "openLoginModal"
  ];

  connect() {
    this.openLoginModalTarget.addEventListener("click", this.openLoginModal);
    this.submitTarget.addEventListener("click", this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    const fields = [
      { target: this.nameTarget, label: this.nameLabelTarget, errorMessage: this.nameErrorMessageTarget, invalidSvg: this.invalidSvgNameTarget },
      { target: this.emailTarget, label: this.emailLabelTarget, errorMessage: this.emailErrorMessageTarget, invalidSvg: this.invalidSvgEmailTarget },
      { target: this.passwordTarget, label: this.passwordLabelTarget, errorMessage: this.passwordErrorMessageTarget, invalidSvg: this.invalidSvgPasswordTarget }
    ];
  
    // Email validation
    const emailField = this.emailTarget.value.trim();
    if (emailField !== "" && !this.validateEmail(emailField)) {
      const emailFieldObject = {
        target: this.emailTarget,
        label: this.emailLabelTarget,
        errorMessage: this.emailErrorMessageTarget,
        invalidSvg: this.invalidSvgEmailTarget
      };
      this.showEmailError(emailFieldObject);
    } else {
      this.hideEmailError(this.emailErrorMessageTarget, this.invalidSvgEmailTarget);
    }
  
    // Password validation
    const passwordField = this.passwordTarget.value.trim();
    if (passwordField !== "" && passwordField.length < 6) {
      const passwordFieldObject = {
        target: this.passwordTarget,
        label: this.passwordLabelTarget,
        errorMessage: this.passwordErrorMessageTarget,
        invalidSvg: this.invalidSvgPasswordTarget
      };
      this.showPasswordError(passwordFieldObject);
    } else {
      this.hidePasswordError(this.passwordErrorMessageTarget, this.invalidSvgPasswordTarget);
    }
    // General validation loop
    fields.forEach(field => {
      if (field.target.name == "email" && this.emailErrorMessageTarget.textContent !== "") {
        return
      }
      if (field.target.name == "password" && this.passwordErrorMessageTarget.textContent !== "") {
        return
      }
      if (field.target.value.trim() === "") {
        this.showFieldError(field);
      } else {
        this.hideFieldError(field);
      }
    });
  }
  

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  showEmailError({ target, label, errorMessage, invalidSvg }) {
    target.classList.add("border-red-500", "text-red-500", "focus:border-red-500");
    label.classList.add("text-red-500");
    errorMessage.textContent = "Invalid email format";
    target.classList.remove("focus:border-black");
    label.classList.remove("text-zinc-400");
    invalidSvg.classList.remove("hidden");
  }

  hideEmailError(errorMessage, invalidSvg) {
    errorMessage.textContent = "";
    invalidSvg.classList.add("hidden");
  }

  showPasswordError({ target, label, errorMessage, invalidSvg }) {
    target.classList.add("border-red-500", "text-red-500", "focus:border-red-500");
    label.classList.add("text-red-500");
    errorMessage.textContent = "Password must be at least 6 characters long";
    target.classList.remove("focus:border-black");
    label.classList.remove("text-zinc-400");
    invalidSvg.classList.remove("hidden");
    console.log("target, label, errorMessage, invalidSvg", target, label, errorMessage, invalidSvg);
  }

  hidePasswordError(errorMessage, invalidSvg) {
    errorMessage.textContent = "";
    invalidSvg.classList.add("hidden");
  }

  showFieldError({ target, label, errorMessage, invalidSvg }) {
    target.classList.add("border-red-500", "text-red-500", "focus:border-red-500");
    label.classList.add("text-red-500");
    errorMessage.textContent = `${label.textContent.trim()} field is required`;
    target.classList.remove("focus:border-black");
    label.classList.remove("text-zinc-400");
    invalidSvg.classList.remove("hidden");
  }

  hideFieldError({ target, label, errorMessage, invalidSvg }) {
    target.classList.remove("border-red-500", "text-red-500", "focus:border-red-500");
    label.classList.remove("text-red-500");
    target.classList.add("focus:border-black");
    label.classList.add("text-zinc-400");
    errorMessage.textContent = "";
    invalidSvg.classList.add("hidden");
  }

  openLoginModal() {
    leave(document.getElementById(`modal-user-SignUpAuth-modal-trigger-panel`));
    leave(document.getElementById(`modal-user-SignUpAuth-modal-trigger-backdrop`));
    leave(document.getElementById(`modal-user-SignUpAuth-modal-trigger-wrapper`));
    document.getElementById("user-loginAuth-modal-trigger").click();
  }

  submitForm() {
    console.log("Submitting form...");
 
  }
}