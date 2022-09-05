class AppPasswordDisplay extends HTMLElement {
  displayElement: HTMLDivElement;
  passwordElement: HTMLParagraphElement;
  buttonElement: HTMLButtonElement;
  infoElement: HTMLParagraphElement;

  static get observedAttributes() {
    return ["password"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-display");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.displayElement = <HTMLDivElement>shadowRoot.querySelector("#display");
    this.passwordElement = <HTMLParagraphElement>shadowRoot.querySelector("#password");
    this.buttonElement = <HTMLButtonElement>shadowRoot.querySelector("#button");
    this.infoElement = document.createElement("p");
    this.infoElement.classList.add("display__info");
    this.handleButtonClick = this.handleButtonClick.bind(this);
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

  connectedCallback() {
    this.buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "password":
        const hasPassword = newValue !== null;
        if (this.displayElement.contains(this.infoElement)) this.displayElement.removeChild(this.infoElement);
        if (hasPassword) {
          this.passwordElement.classList.add("display__password--generated");
          this.buttonElement.removeAttribute("disabled");
          this.passwordElement.textContent = newValue;
        } else {
          this.passwordElement.classList.remove("display__password--generated");
          this.buttonElement.setAttribute("disabled", "");
          this.passwordElement.textContent = "P4$5W0rD!";
        }
        break;
      default:
        throw new Error("The modified attribute is not observed");
    }
  }

  handleButtonClick() {
    const password = this.password;
    if (password !== null) {
      navigator.clipboard.writeText(password).then(() => {
        if (!this.displayElement.contains(this.infoElement)) this.buttonElement.before(this.infoElement);
        if (this.infoElement.textContent !== "copied") this.infoElement.textContent = "copied";
        this.infoElement.classList.remove("display__info--error");
        this.infoElement.classList.add("display__info--success");
      }, () => {
        if (!this.displayElement.contains(this.infoElement)) this.buttonElement.before(this.infoElement);
        if (this.infoElement.textContent !== "error") this.infoElement.textContent = "error";
        this.infoElement.classList.remove("display__info--success");
        this.infoElement.classList.add("display__info--error");
      });
    } else {
      throw new Error("No password has been set");
    }
  }
}

export default AppPasswordDisplay;