import resetSheet from "@styles/reset";

class AppPasswordDisplay extends HTMLElement {
  passwordElement: HTMLParagraphElement;

  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-display");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
    this.passwordElement = <HTMLParagraphElement>shadowRoot.querySelector("#password");
  }

  get value(): string {
    return this.getAttribute("value") || "P4$5W0rD!";
  }

  set value(newValue: string) {
    this.setAttribute("value", newValue);
    this.passwordElement.classList.add("display__password--generated");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "value":
        this.passwordElement.textContent = newValue;
        break;
      default:
        throw new Error("The modified attribute is not observed");
    }
  }

}

export default AppPasswordDisplay;