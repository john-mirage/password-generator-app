import resetSheet from "@styles/reset";
import AppPasswordDisplay from "@components/app-password-display";

const alphaDatabase = "abcdefghijklmnopqrstuvwxyz";
const numberDatabase = "0123456789";
const symbolDatabase = "&é(-è_çà)=$ù%";

class AppPasswordGenerator extends HTMLElement {
  displayElement: AppPasswordDisplay;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-generator");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.displayElement = <AppPasswordDisplay>shadowRoot.querySelector("#display");
    this.handleGeneratePassword = this.handleGeneratePassword.bind(this);
  }

  connectedCallback() {
    this.addEventListener("generate-password", this.handleGeneratePassword);
  }

  disconnectedCallback() {
    this.removeEventListener("generate-password", this.handleGeneratePassword);
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
    console.log("generate...");
    let password = "";
    for (let index = 0; index < length; ++index) {
      password += database.charAt(Math.random() * database.length);
    }
    console.log(password);
    this.displayElement.value = password;
  }
}

export default AppPasswordGenerator;