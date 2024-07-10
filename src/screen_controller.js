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
  static #renderTemperatureInfo(day, separator = " / ", scale = "celsius") {
    const temperatureContainer = document.createElement("div");
    const averageSpan = document.createElement("span");
    const minMaxContainer = document.createElement("div");
    const maxSpan = document.createElement("span");
    const minSpan = document.createElement("span");
    const minMaxDivisor = document.createElement("span");
    const conditionSpan = document.createElement("span");
    temperatureContainer.classList.add("temperature-info-container");
    averageSpan.classList.add("average-temperature");
    minMaxContainer.classList.add("min-max-temperature-container");
    minSpan.classList.add("min-temperature");
    maxSpan.classList.add("max-temperature");
    averageSpan.textContent = day.temperature.average[scale];
    minSpan.textContent = day.temperature.min[scale];
    maxSpan.textContent = day.temperature.max[scale];
    minMaxDivisor.textContent = separator;
    conditionSpan.textContent = day.condition;
    [minSpan, maxSpan, averageSpan].forEach(
      (element) => (element.dataset.scale = scale[0])
    );
    minMaxContainer.append(minSpan, minMaxDivisor, maxSpan);
    temperatureContainer.append(averageSpan, conditionSpan, minMaxContainer);
    return temperatureContainer;
  }
}
//TODO
