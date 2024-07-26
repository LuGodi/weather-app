import Weather from "./weather";
import renderUtil from "./render_util";
import FormController from "./form_controller";
import { format, parseISO } from "date-fns";

export default class ScreenController {
  //theres most certainly a better way
  static scale;
  static cachedDom = {
    mainEl: document.querySelector(".main"),
    body: document.querySelector("body"),
    root: document.documentElement,
    hamburgerIcon: document.querySelector(".hamburger-menu-button"),

    modal: this.#renderModal(),
  };
  static conditionIcons = renderUtil.importedConditionIcons();
  static init() {
    console.log(this.cachedDom.modal);
    const home = this.renderHome();
    this.cachedDom.body.append(this.cachedDom.modal);
    this.cachedDom.mainEl.append(home);
    this.cachedDom.hamburgerIcon.addEventListener("click", () =>
      this.cachedDom.modal.showModal()
    );
    this.cachedDom.modal.showModal();
  }
  static renderHome() {
    const logo = document.createElement("div");
    logo.classList.add("home");
    logo.textContent = "Weatherite";
    logo.classList.add("logo");
    return logo;
  }
  //Main Day
  static render(days, currentConditions) {
    this.scale = Weather.scale[Weather.activeScale];
    const firstDay = days[0];
    const firstDayInformation = this.renderDay(firstDay, currentConditions);
    const nextDaysInformation = this.renderNextDays(days);
    this.cachedDom.mainEl.replaceChildren(
      ...firstDayInformation,
      nextDaysInformation
    );
  }
  static renderLoading() {
    const logo = this.renderHome();
    const div = document.createElement("div");
    div.textContent = "loading";
    div.classList.add("loading-div");
    this.cachedDom.mainEl.replaceChildren(logo, div);
  }
  static #renderModal() {
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    const closeButton = document.createElement("button");
    const searchContainer = this.#renderSearchInput();
    const scaleFieldset = this.#renderScaleFieldset(Weather.scale);
    closeButton.setAttribute("formmethod", "dialog");
    closeButton.setAttribute("value", "closeDialog");
    closeButton.classList.add("close-button");
    closeButton.textContent = "x";

    form.setAttribute("method", "dialog");
    form.append(closeButton, searchContainer, scaleFieldset);
    dialog.append(form);
    dialog.addEventListener("close", FormController.modalListener);

    return dialog;
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
    searchButton.value = "loadData";
    searchButton.id = "load-data-button";

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
  //TODO add date fns for proper date display
  static #renderDayDateInfo(day, currentConditions) {
    const divEl = document.createElement("div");
    const dateSpan = document.createElement("span");
    const span = document.createElement("span");
    dateSpan.textContent = format(parseISO(day.datetime), "dd/MM/yyyy");
    span.textContent = `Updated at ${currentConditions.datetime}`;
    divEl.classList.add("date-container");
    divEl.append(dateSpan, span);
    return divEl;
  }
  static #setBackgroundColor(isNightFun) {
    if (isNightFun) {
      this.cachedDom.body.style.background = "var(--night-color)";
    } else {
      this.cachedDom.body.style.background = "var(--day-color)";
    }
  }

  //TODO Separate this in more functions, this should be for the top part only

  static renderDay(day, currentConditions) {
    const date = this.#renderDayDateInfo(day, currentConditions);
    const topElement = this.#renderDayTopInfo(day, currentConditions);
    const midElement = this.#renderDayAdditionalInfo(day);
    const hourChart = this.renderHoursChart(day);
    this.#setBackgroundColor(renderUtil.isNight(day));
    // this.cachedDom.mainEl.replaceChildren(
    //   date,
    //   topElement,
    //   midElement,
    //   hourChart
    // );
    return [date, topElement, midElement, hourChart];
  }
  static #renderDayTopInfo(day, currentConditions) {
    console.log(currentConditions);
    const topEl = document.createElement("div");
    const locationEl = document.createElement("span");
    const feelsLikeEl = document.createElement("span");
    const temperatureContainer = this.#renderTemperatureInfo(day);
    const weatherDescription = document.createElement("span");
    const iconEl = document.createElement("span");
    const icon = document.createElement("img");
    iconEl.classList.add("icon-container");
    topEl.classList.add("weather-top");
    locationEl.classList.add("location-container");
    feelsLikeEl.classList.add("feelslike-container");
    weatherDescription.classList.add("weather-description");
    // iconEl.textContent = day.icon;
    icon.src = this.conditionIcons[currentConditions.icon + ".png"];
    locationEl.textContent = day.location;
    feelsLikeEl.textContent = `Feels like ${currentConditions.temperature.feelslike}`;
    feelsLikeEl.dataset.scale = this.scale.temperature;
    weatherDescription.textContent = day.description;
    iconEl.append(icon);
    locationEl.append(iconEl);
    topEl.append(
      locationEl,
      temperatureContainer,

      feelsLikeEl,
      weatherDescription
    );
    return topEl;
  }
  static #renderDayAdditionalInfo(day) {
    const midEl = document.createElement("div");
    const containers = {};

    day.list((weatherProperty, value, currentDay) => {
      const undesiredweatherProperties = [
        "temperature",
        "datetime",
        "icon",
        "location",
        "description",
        "condition",
        "hours",
      ];
      if (undesiredweatherProperties.includes(weatherProperty) === false) {
        const container = this.#additionalInfoContainer(
          currentDay,
          weatherProperty
        );
        containers[weatherProperty] = container;
      }
    });
    console.log("logging containers ");
    console.log(containers);
    midEl.classList.add("weather-mid");
    midEl.append(...Object.values(containers));

    return midEl;
  }

  static #additionalInfoContainer(day, attribute) {
    const container = document.createElement("div");
    const title = document.createElement("span");
    const value = document.createElement("span");
    container.classList.add("additional-container");
    container.classList.add(`${attribute}-container`);
    title.classList.add(`${attribute}-span`);
    title.textContent = renderUtil.splitOnUpperCase(attribute);
    title.dataset.icon = `${attribute}_icon`;
    if (this.scale[attribute]) value.dataset.scale = this.scale[attribute];

    value.textContent = day[attribute];
    container.append(title, value);
    return container;
  }
  static #renderTemperatureInfo(day, separator = " / ") {
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
    averageSpan.textContent = day.temperature.average;
    minSpan.textContent = day.temperature.min;
    maxSpan.textContent = day.temperature.max;
    minMaxDivisor.textContent = separator;
    conditionSpan.textContent = day.condition;
    [minSpan, maxSpan, averageSpan].forEach(
      (element) => (element.dataset.scale = this.scale.temperature[0])
    );
    minMaxContainer.append(minSpan, minMaxDivisor, maxSpan);
    temperatureContainer.append(averageSpan, conditionSpan, minMaxContainer);
    return temperatureContainer;
  }
  static renderHoursChart(day) {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("hours-chart");
    const hourElements = [];
    day.listHours((hourInstance) => {
      const hourEl = this.#renderHour(hourInstance);
      hourElements.push(hourEl);
    });
    mainContainer.append(...hourElements);
    return mainContainer;
  }
  //i can refactor this to make it use hour.list
  static #renderHour(hour) {
    const hourContainer = document.createElement("div");
    const hourValue = document.createElement("span");
    const iconWeather = document.createElement("img");
    const temperature = document.createElement("span");
    const wind = document.createElement("span");
    const precipitationProb = document.createElement("span");
    hourContainer.classList.add("hour-information");
    hourValue.textContent = hour.hour;
    iconWeather.src = this.conditionIcons[hour.icon + ".png"];
    temperature.textContent = hour.temperature.average;
    temperature.dataset.scale = this.scale["temperature"];
    wind.textContent = hour.wind;
    wind.dataset.scale = this.scale["wind"];
    precipitationProb.textContent = hour.precipitation;
    precipitationProb.dataset.scale = this.scale["precipitationChance"];
    hourContainer.append(
      hourValue,
      temperature,
      iconWeather,
      wind,
      precipitationProb
    );
    return hourContainer;
  }

  //additional days
  static renderNextDays(daysArr) {
    const container = document.createElement("div");
    const dayEl = [];
    for (const day of daysArr) {
      dayEl.push(this.#renderNextDay(day));
    }
    container.classList.add("next-days-container");
    container.append(...dayEl);
    // this.cachedDom.mainEl.append(container);
    return container;
  }

  static #renderNextDay(day) {
    const holder = document.createElement("div");
    const leftContainer = document.createElement("div");
    const rightContainer = document.createElement("div");
    const temperatureContainer = this.#renderTemperatureInfo(day);
    const rainChance = this.#additionalInfoContainer(
      day,
      "precipitationChance"
    );
    const moon = this.#additionalInfoContainer(day, "moon");
    const date = document.createElement("span");
    const weekDay = document.createElement("p");
    const icon = this.#renderWeatherIcon(day.icon);

    date.classList.add("date");
    weekDay.classList.add("day-of-the-week");
    moon.classList.add("moon");
    rainChance.classList.add("precipitation");
    holder.classList.add("next-day-container");
    rightContainer.classList.add("next-days-right-container");
    leftContainer.classList.add("next-days-left-container");

    date.textContent = format(parseISO(day.datetime), "dd/MM/yyyy"); //TODO FORMAT RELATIVE
    weekDay.textContent = format(parseISO(day.datetime), "EEEE");

    leftContainer.append(weekDay, icon);
    rightContainer.append(temperatureContainer, rainChance, moon);

    holder.append(date, weekDay, icon, temperatureContainer, rainChance, moon);

    return holder;
  }

  static #renderWeatherIcon(iconName) {
    const div = document.createElement("div");
    div.classList.add("icon-container");
    const icon = document.createElement("img");
    icon.src = this.conditionIcons[iconName + ".png"];
    div.append(icon);
    return div;
  }
}
