import AppPasswordStrength from "@components/app-password-strength";

class AppPasswordForm extends HTMLElement {
  formElement: HTMLFormElement;
  buttonElement: HTMLButtonElement;
  lengthInputElement: HTMLInputElement;
  uppercaseInputElement: HTMLInputElement;
  lowercaseInputElement: HTMLInputElement;
  numbersInputElement: HTMLInputElement;
  symbolsInputElement: HTMLInputElement;
  strengthElement: AppPasswordStrength;

  static get observedAttributes() {
    return ["disabled", "strength"];
  }
  
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-form");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.formElement = <HTMLFormElement>shadowRoot.querySelector("#form");
    this.buttonElement = <HTMLButtonElement>shadowRoot.querySelector("#button");
    this.lengthInputElement = <HTMLInputElement>shadowRoot.querySelector("#length");
    this.uppercaseInputElement = <HTMLInputElement>shadowRoot.querySelector("#uppercase");
    this.lowercaseInputElement = <HTMLInputElement>shadowRoot.querySelector("#lowercase");
    this.numbersInputElement = <HTMLInputElement>shadowRoot.querySelector("#numbers");
    this.symbolsInputElement = <HTMLInputElement>shadowRoot.querySelector("#symbols");
    this.strengthElement = <AppPasswordStrength>shadowRoot.querySelector("#strength");
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get disabled(): boolean {
    return this.hasAttribute("disabled");
  }

  set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
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
    this.disabled = !this.formIsValid();
    this.addEventListener("update-form-input", this.handleInput);
    this.buttonElement.addEventListener("click", this.handleSubmit);
  }

  disconnectedCallback() {
    this.removeEventListener("update-form-input", this.handleInput);
    this.buttonElement.removeEventListener("click", this.handleSubmit);
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "disabled":
        const isDisabled = newValue !== null;
        if (isDisabled) {
          this.buttonElement.setAttribute("disabled", "");
        } else {
          this.buttonElement.removeAttribute("disabled");
        }
        break;
      case "strength":
        this.strengthElement.strength = newValue;
        break;
      default:
        throw new Error("The modified attribute is not observed");
    }
  }

  handleInput(event: Event) {
    const { name, value } = (<CustomEvent>event).detail;
    switch (name) {
      case "length-ref":
        this.lengthInputElement.value = value;
        break;
      case "uppercase-ref":
        this.uppercaseInputElement.checked = value !== null;
        break;
      case "lowercase-ref":
        this.lowercaseInputElement.checked = value !== null;
        break;
      case "numbers-ref":
        this.numbersInputElement.checked = value !== null;
        break;
      case "symbols-ref":
        this.symbolsInputElement.checked = value !== null;
        break;
      default:
        throw new Error("The name is not valid");
    }
    this.disabled = !this.formIsValid();
  }

  getFormData() {
    const formData = new FormData(this.formElement);
    const length = Number(formData.get("length"));
    const hasUppercase = formData.get("uppercase") !== null;
    const hasLowercase = formData.get("lowercase") !== null;
    const hasNumbers = formData.get("numbers") !== null;
    const hasSymbols = formData.get("symbols") !== null;
    return { length, hasUppercase, hasLowercase, hasNumbers, hasSymbols };
  }

  formIsValid(): boolean {
    const { length, hasUppercase, hasLowercase, hasNumbers, hasSymbols } = this.getFormData();
    return length > 0 && (hasUppercase || hasLowercase || hasNumbers || hasSymbols);
  }

  handleSubmit() {
    const customEvent = new CustomEvent("generate-password", {
      bubbles: true,
      composed: true,
      detail: this.getFormData(),
    });
    this.dispatchEvent(customEvent);
  }
}

export default AppPasswordForm;