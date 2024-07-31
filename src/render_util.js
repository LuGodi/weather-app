import { parse, isAfter, isBefore, parseISO } from "date-fns";
export default class renderUtil {
  static splitOnUpperCase(string) {
    const regex = /(\w)([A-Z])/g;
    return string.replace(regex, "$1 $2");
  }

  //TODO find a better place for this
  static isNight(day, currentConditions) {
    const current = parse(
      currentConditions.datetime,
      "HH:mm:ss",
      parseISO(day.datetime)
    );
    console.log(current);
    const sunrise = parse(day.sunrise, "HH:mm:ss", parseISO(day.datetime));
    const sunset = parse(day.sunset, "HH:mm:ss", parseISO(day.datetime));
    console.log(sunrise);
    console.log(sunset);
    if (isAfter(current, sunrise) && isBefore(current, sunset)) {
      return false;
    } else {
      return true;
    }
  }

  static #importAll(req) {
    console.log("importing");
    const cache = {};
    req.keys().forEach((key) => {
      cache[key.replace("./", "")] = req(key);
    });
    return cache;
  }

  static importedConditionIcons() {
    return this.#importAll(
      require.context("../assets/condition-icons", false, /\.png$/)
    );
  }
  static parseDate(loadedDateStr) {
    const parsed = parseISO(loadedDateStr);
    return parsed;
  }
}
