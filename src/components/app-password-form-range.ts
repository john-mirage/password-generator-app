import resetSheet from "@styles/reset";

class AppPasswordFormRange extends HTMLElement {
  maxLengthElement: HTMLParagraphElement;
  inputElement: HTMLInputElement;
  progressElement: HTMLDivElement;
  thumbElement: HTMLDivElement;

  static get observedAttributes() {
    return ["data-value"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-form-range");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.maxLengthElement = <HTMLParagraphElement>shadowRoot.querySelector(".range__max-length");
    this.inputElement = <HTMLInputElement>shadowRoot.querySelector(".range__input");
    this.progressElement = <HTMLDivElement>shadowRoot.querySelector(".range__progress");
    this.thumbElement = <HTMLDivElement>shadowRoot.querySelector(".range__thumb");
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get dataValue(): string {
    return this.dataset.value || "12";
  }

  set dataValue(newDataValue: string) {
    this.dataset.value = newDataValue;
  }

  connectedCallback() {
    this.handleInputChange();
    this.inputElement.addEventListener("input", this.handleInputChange);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("input", this.handleInputChange);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "data-value":
        const minValue = Number(this.inputElement.min);
        const maxValue = Number(this.inputElement.max);
        const currentValue = Number(newValue);
        const ratio = ((currentValue - minValue) * 100) / (maxValue - minValue);
        const newPosition = ratio === 50 ? 0 : 14 - (ratio * 0.28);
        this.progressElement.style.width = ratio <= 0 ? "0" : `calc(${ratio}% + ${newPosition}px)`;
        this.thumbElement.style.left = `calc(${ratio}% + ${newPosition}px)`;
        this.maxLengthElement.textContent = newValue;
        break;
      default:
        throw new Error("The modified attribute is not observed");
    }
  }

  handleInputChange() {
    this.dataValue = this.inputElement.value;
  }
}

export default AppPasswordFormRange;