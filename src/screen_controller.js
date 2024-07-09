export default class ScreenController {
  static cachedDom = {
    mainEl: document.querySelector(".main"),
  };
  static renderSearchInput() {
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    const inputSearch = document.createElement("input");
    inputSearch.type = "search";
    searchContainer.append(inputSearch);
    return searchContainer;
  }
  static renderDayInfo(day) {
    const dayElements = [];
    const topEl = document.createElement("div");
    const locationEl = document.createElement("span");
    const temperatureContainer = this.#renderTemperatureInfo(day);
    topEl.classList.add("weather-top");
    locationEl.classList.add("location-container");
    locationEl.textContent = day.location;
    topEl.append(locationEl, temperatureContainer);

    this.cachedDom.mainEl.replaceChildren(topEl);
  }
  static #renderTemperatureInfo(day) {
    const temperatureContainer = document.createElement("div");
    const averageSpan = document.createElement("span");
    const minMaxContainer = document.createElement("div");
    const maxSpan = document.createElement("span");
    const minSpan = document.createElement("span");
    const conditionSpan = document.createElement("span");
    temperatureContainer.classList.add("temperature-info-container");
    averageSpan.textContent = day.temperature.average.celsius;
    minMaxContainer.classList.add(".min-max-container");
    minSpan.textContent = day.temperature.min.celsius;
    maxSpan.textContent = day.temperature.max.celsius;
    conditionSpan.textContent = day.condition;
    minMaxContainer.append(minSpan, maxSpan);
    temperatureContainer.append(averageSpan, conditionSpan, minMaxContainer);
    return temperatureContainer;
  }
}
//TODO
