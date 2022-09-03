import resetSheet from "@styles/reset";

class AppPasswordForm extends HTMLElement {
  formElement: HTMLFormElement;
  buttonElement: HTMLButtonElement;
  lengthInputElement: HTMLInputElement;
  uppercaseInputElement: HTMLInputElement;
  lowercaseInputElement: HTMLInputElement;
  numbersInputElement: HTMLInputElement;
  symbolsInputElement: HTMLInputElement;
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-form");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.formElement = <HTMLFormElement>shadowRoot.querySelector("#form");
    this.buttonElement = <HTMLButtonElement>shadowRoot.querySelector("#button");
    this.lengthInputElement = <HTMLInputElement>shadowRoot.querySelector("#length");
    this.uppercaseInputElement = <HTMLInputElement>shadowRoot.querySelector("#uppercase");
    this.lowercaseInputElement = <HTMLInputElement>shadowRoot.querySelector("#lowercase");
    this.numbersInputElement = <HTMLInputElement>shadowRoot.querySelector("#numbers");
    this.symbolsInputElement = <HTMLInputElement>shadowRoot.querySelector("#symbols");
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  connectedCallback() {
    this.handleButton();
    this.addEventListener("update-form-input", this.handleInput);
    this.buttonElement.addEventListener("click", this.handleSubmit);
  }

  disconnectedCallback() {
    this.removeEventListener("update-form-input", this.handleInput);
    this.buttonElement.removeEventListener("click", this.handleSubmit);
  }

  handleInput(event: Event) {
    const { name, value } = (<CustomEvent>event).detail;
    switch (name) {
      case "length-ref":
        this.lengthInputElement.value = value;
        break;
      case "uppercase-ref":
        this.uppercaseInputElement.value = String(value !== null);
        break;
      case "lowercase-ref":
        this.lowercaseInputElement.value = String(value !== null);
        break;
      case "numbers-ref":
        this.numbersInputElement.value = String(value !== null);
        break;
      case "symbols-ref":
        this.symbolsInputElement.value = String(value !== null);
        break;
      default:
        throw new Error("The name is not valid");
    }
    this.handleButton();
  }

  handleButton() {
    const formData = new FormData(this.formElement);
    const hasUppercase = formData.get("uppercase") === "true";
    const hasLowercase = formData.get("lowercase") === "true";
    const hasNumbers = formData.get("numbers") === "true";
    const hasSymbols = formData.get("symbols") === "true";
    if (hasUppercase || hasLowercase || hasNumbers || hasSymbols) {
      this.buttonElement.removeAttribute("disabled");
    } else {
      this.buttonElement.setAttribute("disabled", "");
    }
  }

  handleSubmit() {
    const formData = new FormData(this.formElement);
    const length = Number(formData.get("length"));
    const hasUppercase = formData.get("uppercase") === "true";
    const hasLowercase = formData.get("lowercase") === "true";
    const hasNumbers = formData.get("numbers") === "true";
    const hasSymbols = formData.get("symbols") === "true";
    const customEvent = new CustomEvent("generate-password", {
      bubbles: true,
      composed: true,
      detail: { length, hasUppercase, hasLowercase, hasNumbers, hasSymbols },
    });
    this.dispatchEvent(customEvent);
  }
}

export default AppPasswordForm;