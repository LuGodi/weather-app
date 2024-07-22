import { parse, isAfter, isBefore } from "date-fns";
export default class renderUtil {
  static splitOnUpperCase(string) {
    const regex = /(\w)([A-Z])/g;
    return string.replace(regex, "$1 $2");
  }

  //TODO find a better place for this
  static isNight(day) {
    const current = new Date();
    const sunrise = parse(day.sunrise, "HH:mm:ss", new Date());
    const sunset = parse(day.sunset, "HH:mm:ss", new Date());

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
}
