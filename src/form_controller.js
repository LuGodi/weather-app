export default class FormController {
  static modalListener(event) {
    const form = event.target.firstChild;
    if (this.returnValue === "loadData" || this.returnValue === "closeDialog") {
      console.log(this.returnValue);
      FormController[this.returnValue](form);
    }
  }

  static loadData(form, buttonId) {
    console.log(form);
    const location = form.elements.location.value;
    const scale = form.elements.scale.value;
    console.log(location, scale);
    this.closeDialog(form);
  }
  static closeDialog(form) {
    form.elements.location.value = "";
  }
}
