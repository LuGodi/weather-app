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
    this.hour = hour;
  }
  list(func) {
    for (const [key, value] of Object.entries(this)) {
      func(key, value, this);
    }
  }
}
