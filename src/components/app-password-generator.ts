import resetSheet from "@styles/reset";
import AppPasswordDisplay from "@components/app-password-display";

const alphaDatabase = "abcdefghijklmnopqrstuvwxyz";
const numberDatabase = "0123456789";
const symbolDatabase = "&é(-è_çà)=$ù%";

class AppPasswordGenerator extends HTMLElement {
  displayElement: AppPasswordDisplay;

  static get observedAttributes() {
    return ["password"];
  }
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-generator");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.displayElement = <AppPasswordDisplay>shadowRoot.querySelector("#display");
    this.handleGeneratePassword = this.handleGeneratePassword.bind(this);
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
    this.addEventListener("generate-password", this.handleGeneratePassword);
  }

  disconnectedCallback() {
    this.removeEventListener("generate-password", this.handleGeneratePassword);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "password":
        this.displayElement.password = newValue;
        break;
      default:
        throw new Error("The modified attribute is not observed");
    }
  }

  handleGeneratePassword(event: Event) {
    const { length, hasUppercase, hasLowercase, hasNumbers, hasSymbols } = (<CustomEvent>event).detail;
    this.generatePassword(length, hasUppercase, hasLowercase, hasNumbers, hasSymbols);
  }

  generatePassword(
    length: number,
    hasUppercase: boolean,
    hasLowercase: boolean,
    hasNumbers: boolean,
    hasSymbols: boolean
  ) {
    let database = "";
    if (hasUppercase) database += alphaDatabase.toUpperCase();
    if (hasLowercase) database += alphaDatabase.toLowerCase();
    if (hasNumbers) database += numberDatabase;
    if (hasSymbols) database += symbolDatabase;
    let password = "";
    for (let index = 0; index < length; ++index) {
      password += database.charAt(Math.random() * database.length);
    }
    this.password = password;
  }
}

export default AppPasswordGenerator;