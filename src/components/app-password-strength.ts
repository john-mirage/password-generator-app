class AppPasswordStrength extends HTMLElement {
  strengthElement: HTMLParagraphElement;
  barsElement: HTMLDivElement;
  
  static get observedAttributes() {
    return ["strength"];
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

  constructor() {
    super();
    const template = <HTMLTemplateElement>document.getElementById("template-app-password-strength");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.append(template.content.cloneNode(true));
    this.strengthElement = <HTMLParagraphElement>shadowRoot.querySelector("#strength");
    this.barsElement = <HTMLDivElement>shadowRoot.querySelector("#bars");
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    switch (name) {
      case "strength":
        const hasStrength = newValue !== null;
        this.clearBars();
        if (hasStrength) {
          this.updateBars(newValue);
          this.strengthElement.textContent = newValue;
        } else {
          this.strengthElement.textContent = "";
        }
        break;
      default:
        throw new Error("The modified attribute is not observed");
    }
  }

  clearBars() {
    Array.from(this.barsElement.children).forEach((barElement) => {
      barElement.classList.remove(
        "strength__bar--red",
        "strength__bar--orange",
        "strength__bar--yellow",
        "strength__bar--green",
      );
    });
  }

  updateBars(strength: string) {
    let length;
    let color;
    switch (strength) {
      case "too weak!":
        length = 1;
        color = "red";
        break;
      case "weak":
        length = 2;
        color = "orange";
        break;
      case "medium":
        length = 3;
        color = "yellow";
        break;
      case "strong":
        length = 4;
        color = "green";
        break;
      default:
        throw new Error("The strength is not valid");
    }
    for (let index = 0; index < length; ++index) {
      this.barsElement.children[index].classList.add(`strength__bar--${color}`);
    }
  }
}

export default AppPasswordStrength;