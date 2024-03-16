import { Controller } from "@hotwired/stimulus";
import axios from "axios";
import { leave } from "el-transition";

export default class extends Controller {
  static targets = [
    "email",
    "emailWrapper",
    "invalidSvg",
    "errorMessage",
    "submit",
    "openSignUpModal",
  ];

  connect() {
    this.openSignUpModalTarget.addEventListener("click", this.openSignUpModal);

    this.submitTarget.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.emailTarget.value.length === 0) {
        // email field is empty, so don't do anything
        this.emailWrapperTarget.classList.add("invalid-inset-input-text-field");
        this.emailWrapperTarget.classList.remove("focus-within:ring-1");
        this.emailWrapperTarget.classList.remove("focus-within:ring-black");
        this.emailWrapperTarget.classList.remove("focus-within:border-black");
        this.invalidSvgTarget.classList.remove("hidden");
        this.errorMessageTarget.classList.remove("hidden");
      } else {
        // email field is filled out, so do something
        axios
          .get("/api/users_by_email", {
            params: {
              email: this.emailTarget.value,
            },
            headers: {
              ACCEPT: "application/json",
            },
          })
          .then((response) => {
            Turbo.visit("/users/sign_in");
          })
          .catch((response) => {
            Turbo.visit("/users/sign_up");
          });
      }
    });
  }

  openSignUpModal() {
    leave(document.getElementById(`modal-user-loginAuth-modal-trigger-panel`));
    leave(document.getElementById(`modal-user-loginAuth-modal-trigger-backdrop`));
    leave(document.getElementById(`modal-user-loginAuth-modal-trigger-wrapper`));
    document.getElementById("user-SignUpAuth-modal-trigger").click();
  }

  submitForm() {
    console.log("aasdofijsiodjf");
  }
}
