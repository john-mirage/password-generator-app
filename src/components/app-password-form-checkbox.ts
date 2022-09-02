import resetSheet from "@styles/reset";

class AppPasswordFormCheckbox extends HTMLElement {
  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-form-checkbox");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.adoptedStyleSheets = [resetSheet];
    shadowRoot.append(template.content.cloneNode(true));
  }

  connectedCallback() {

  }
}

export default AppPasswordFormCheckbox;