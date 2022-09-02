import "./main.css";

import AppPasswordGenerator from "@components/app-password-generator";
import AppPasswordDisplay from "@components/app-password-display";
import AppPasswordForm from "@components/app-password-form";
import AppPasswordFormRange from "@components/app-password-form-range";
import AppPasswordFormCheckbox from "@components/app-password-form-checkbox";
import AppPasswordStrength from "@components/app-password-strength";

customElements.define("app-password-generator", AppPasswordGenerator);
customElements.define("app-password-display", AppPasswordDisplay);
customElements.define("app-password-form", AppPasswordForm);
customElements.define("app-password-form-range", AppPasswordFormRange);
customElements.define("app-password-form-checkbox", AppPasswordFormCheckbox);
customElements.define("app-password-strength", AppPasswordStrength);