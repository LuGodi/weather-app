export default class Hour {
  constructor(hour, hourReport) {
    this.condition = hourReport.condition;
    this.temperature = {
      average: hourReport.average,
      feelslike: hourReport.feelslike,
    };
    this.icon = hourReport.icon;
    this.precipitation = hourReport.precipitation;
    this.wind = hourReport.wind;
    this.hour = hour;
  }
}
