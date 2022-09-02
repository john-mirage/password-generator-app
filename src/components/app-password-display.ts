import resetSheet from "@styles/reset";

class AppPasswordDisplay extends HTMLElement {
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-display");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {

  }
}

export default AppPasswordDisplay;