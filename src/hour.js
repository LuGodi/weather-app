import { format, parse } from "date-fns";
export default class Hour {
  constructor(hour, hourReport) {
    this.condition = hourReport.condition;
    this.temperature = {
      average: hourReport.temperature.average,
      feelslike: hourReport.temperature.feelslike,
    };
    this.icon = hourReport.icon;
    this.precipitation = hourReport.precipitation;
    this.wind = hourReport.wind;
    console.log(hour);
    console.log(typeof hour);
    this.hour = format(parse(hour, "HH:mm:ss", new Date()), "HH:mm");
  }
  list(func) {
    for (const [key, value] of Object.entries(this)) {
      func(key, value, this);
    }
  }
}
