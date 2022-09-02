import resetSheet from "@styles/reset";

class AppPasswordStrength extends HTMLElement {
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-strength");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {

  }
}

export default AppPasswordStrength;