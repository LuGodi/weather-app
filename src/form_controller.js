import Weather from "./weather";
import App from "./index";
import "./nav.css";
import MenuIcon from "../assets/home-icons/menu.svg";
import SearchIcon from "../assets/home-icons/search.svg";
import ScreenController from "./screen_Controller";
import LoadingIcon from "../assets/home-icons/progress.svg";

export default class FormController {
  //Change to private
  static modalListener(event) {
    const form = event.currentTarget;
    console.log(event);
    const pressed = event.target.parentElement;
    console.log(pressed);
    if (
      pressed.tagName === "BUTTON" &&
      (pressed.value === "loadData" || pressed.value === "closeDialog")
    ) {
      console.log(this);
      FormController[pressed.value](form);
    }
  }

  static loadData(form) {
    console.log(form);
    const location = form.elements.location.value;
    const scale = form.elements.scale.value;
    console.log(location, scale);

    // Weather.init(location, scale);
    this.closeDialog(form);
    this.#renderLoading();

    App.loadData(location, scale);
  }
  static closeDialog(form) {
    const dialog = form.parentElement;
    form.elements.location.value = "";
    dialog.close();
  }

  static renderModal() {
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    const closeButton = document.createElement("button");
    const menuIcon = document.createElement("img");
    const searchContainer = this.#renderSearchInput();
    const scaleFieldset = this.#renderScaleFieldset(Weather.scale);
    closeButton.setAttribute("formmethod", "dialog");
    closeButton.setAttribute("value", "closeDialog");
    closeButton.classList.add("close-button");
    closeButton.setAttribute("type", "button");
    menuIcon.src = MenuIcon;
    closeButton.append(menuIcon);

    form.setAttribute("method", "dialog");
    form.append(closeButton, searchContainer, scaleFieldset);
    dialog.append(form);
    // dialog.addEventListener("close", FormController.modalListener);
    form.addEventListener("click", this.modalListener);

    return dialog;
  }
  static #renderLoading() {
    const logo = ScreenController.renderHome();
    const div = document.createElement("div");
    const loadingIcon = document.createElement("img");
    loadingIcon.classList.add("loading-icon");
    loadingIcon.src = LoadingIcon;
    div.textContent = "LOADING";
    div.classList.add("loading-div");
    div.append(loadingIcon);
    ScreenController.cachedDom.mainEl.replaceChildren(logo, div);
  }
  static renderFailedToFetch(errorObj) {
    const logo = ScreenController.renderHome();
    const div = document.createElement("div");
    div.classList.add("error-div");
    div.innerText = `Failed to load information from ${errorObj.location}.\nAre you sure this is a valid place?\nStatus code : ${errorObj.code}`;
    ScreenController.cachedDom.mainEl.replaceChildren(logo, div);
  }

  static #renderSearchInput() {
    const searchContainer = document.createElement("div");
    const searchInput = document.createElement("input");
    const label = document.createElement("label");
    label.textContent = "Desired Location: ";
    searchInput.id = "search-input";
    searchInput.name = "location";
    searchInput.type = "search";

    label.setAttribute("for", searchInput.id);

    const searchButton = document.createElement("button");
    const searchImg = document.createElement("img");
    searchImg.src = SearchIcon;
    searchButton.value = "loadData";
    searchButton.id = "load-data-button";
    searchButton.append(searchImg);

    searchContainer.classList.add("search-container");
    searchContainer.append(label, searchInput, searchButton);
    return searchContainer;
  }

  static #renderScaleFieldset(scaleObject) {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Choose a scale: ";

    const radios = [];
    for (const scale of Object.keys(scaleObject)) {
      const span = document.createElement("span");
      const input = document.createElement("input");
      const label = document.createElement("label");
      input.type = "radio";
      input.value = scale;
      input.name = "scale";
      input.id = `${scale}-scale`;
      if (input.value === "metric") input.checked = true;
      label.setAttribute("for", input.id);
      label.textContent = `${scale} : ${scaleObject[scale].temperature}/${scaleObject[scale].wind}`;
      span.append(input, label);
      radios.push(span);
    }
    fieldset.append(legend, ...radios);
    return fieldset;
  }
}
