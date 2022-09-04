import resetSheet from "@styles/reset";
import AppPasswordDisplay from "@components/app-password-display";
import AppPasswordForm from "@components/app-password-form";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import zxcvbnEnPackage from "@zxcvbn-ts/language-en";

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "~`!@#$%^&*()_-+={[}]|:;<,>.?/";

class AppPasswordGenerator extends HTMLElement {
  displayElement: AppPasswordDisplay;
  formElement: AppPasswordForm;

  static get observedAttributes() {
    return ["password", "strength"];
  }
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-generator");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.displayElement = <AppPasswordDisplay>shadowRoot.querySelector("#display");
    this.formElement = <AppPasswordForm>shadowRoot.querySelector("#form");
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

  get strength(): string | null {
    return this.getAttribute("strength");
  }

  set strength(newStrength: string | null) {
    const hasStrength = newStrength !== null;
    if (hasStrength) {
      this.setAttribute("strength", newStrength);
    } else {
      this.removeAttribute("strength");
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
      case "strength":
        this.formElement.strength = newValue;
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
    if (hasUppercase) database += uppercaseLetters;
    if (hasLowercase) database += lowercaseLetters;
    if (hasNumbers) database += numbers;
    if (hasSymbols) database += symbols;
    let password = "";
    for (let index = 0; index < length; ++index) {
      password += database.charAt(Math.random() * database.length);
    }
    this.password = password;
    this.strength = this.generateStrength(password);
  }

  generateStrength(password: string) {
    const score = zxcvbn(password).score;
    switch (score) {
      case 0:
        return "too weak!";
      case 1:
        return "too weak!";
      case 2:
        return "weak";
      case 3:
        return "medium";
      case 4:
        return "strong";
      default:
        throw new Error("The score is not valid");
    }
  }
}

export default AppPasswordGenerator;