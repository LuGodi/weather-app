export default class renderUtil {
  static splitOnUpperCase(string) {
    const regex = /(\w)([A-Z])/g;
    return string.replace(regex, "$1 $2");
  }

  //using require context to import all icon images
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
