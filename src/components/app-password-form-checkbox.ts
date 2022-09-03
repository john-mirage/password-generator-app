import resetSheet from "@styles/reset";

class AppPasswordFormCheckbox extends HTMLElement {
  inputElement: HTMLInputElement;

  static get observedAttributes() {
    return ["checked"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-form-checkbox");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.inputElement = <HTMLInputElement>shadowRoot.querySelector(".checkbox__input");
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get name(): string {
    return this.getAttribute("name") || "";
  }

  set name(newName: string) {
    this.setAttribute("name", newName);
  }

  get checked(): boolean {
    return this.getAttribute("checked") !== null;
  }

  set checked(isChecked: boolean) {
    if (typeof isChecked === "boolean") {
      if (isChecked) {
        this.setAttribute("checked", "");
      } else {
        this.removeAttribute("checked");
      }
    } else {
      throw new Error("The new checked state is not valid");
    }
  }

  connectedCallback() {
    this.handleInputChange();
    this.inputElement.addEventListener("change", this.handleInputChange);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("change", this.handleInputChange);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "checked":
        const customEvent = new CustomEvent("update-form-input", {
          bubbles: true,
          composed: true,
          detail: {
            name: this.name,
            value: newValue,
          },
        });
        this.dispatchEvent(customEvent);
        break;
      default:
        throw new Error("The modified attribute is not observed");
    }
  }

  handleInputChange() {
    this.checked = this.inputElement.checked;
  }
}

export default AppPasswordFormCheckbox;