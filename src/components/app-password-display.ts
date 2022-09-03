import resetSheet from "@styles/reset";

class AppPasswordDisplay extends HTMLElement {
  passwordElement: HTMLParagraphElement;

  static get observedAttributes() {
    return ["password"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-display");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.passwordElement = <HTMLParagraphElement>shadowRoot.querySelector("#password");
  }

  get password(): string | null {
    return this.getAttribute("password");
  }

  set password(newPassword: string | null) {
    const hasPassword = newPassword !== null;
    if (hasPassword) {
      this.setAttribute("password", newPassword);
    } else {
      this.removeAttribute("password");
    }
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "password":
        this.passwordElement.textContent = newValue;
        if (!this.passwordElement.classList.contains("display__password--generated")) {
          this.passwordElement.classList.add("display__password--generated");
        }
        break;
      default:
        throw new Error("The modified attribute is not observed");
    }
  }

}

export default AppPasswordDisplay;