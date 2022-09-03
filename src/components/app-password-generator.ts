import resetSheet from "@styles/reset";
import AppPasswordDisplay from "@components/app-password-display";

class AppPasswordGenerator extends HTMLElement {
  displayElement: AppPasswordDisplay
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-generator");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.displayElement = <AppPasswordDisplay>shadowRoot.querySelector("#display");
    this.generatePassword = this.generatePassword.bind(this);
  }

  connectedCallback() {
    this.addEventListener("generate-password", this.generatePassword);
  }

  generatePassword(event: Event) {
    const { length, hasUppercase, hasLowercase, hasNumbers, hasSymbols } = (<CustomEvent>event).detail;
    console.log("generate");
  }
}

export default AppPasswordGenerator;