import Weather from "./weather";
import App from "./index";
export default class FormController {
  static modalListener(event) {
    const form = event.target.firstChild;
    if (this.returnValue === "loadData" || this.returnValue === "closeDialog") {
      console.log(this.returnValue);
      FormController[this.returnValue](form);
    }
  }

  static loadData(form) {
    console.log(form);
    const location = form.elements.location.value;
    const scale = form.elements.scale.value;
    console.log(location, scale);

    // Weather.init(location, scale);
    this.closeDialog(form);
    App.loadData(location, scale);
  }
  static closeDialog(form) {
    form.elements.location.value = "";
  }
}
