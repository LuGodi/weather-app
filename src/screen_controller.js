export default class ScreenController {
  //structure will consist of [tagname,classname and childs]
  //if its a text, it will be [text, textcontent]
  //for images, [img,classname,img.src]
  static renderer(htmlSkeleton) {
    const Elements = [];

    // const parentElement;
    const structure = htmlSkeleton;
    console.log(structure);
    const tagname = structure[0];
    const className = structure[1];
    const childs = structure[2];
    if (tagname === "text") {
      return this.renderText(structure);
    } else if (tagname === "img") {
      console.log(structure);
      return this.renderImg(structure);
    } else {
      const element = document.createElement(tagname);
      element.className = className;
      if (childs === undefined || childs == null) return;
      Elements.push(element);
      for (const child of childs) {
        const childElement = this.renderer(child);
        element.append(childElement);
      }
      console.log(element);
      console.log(Elements);
      return element;
    }
  }
  static renderText(textArray) {
    const textNode = document.createTextNode(textArray[1]);
    return textNode;
  }
  static renderImg(imgArray) {
    const imgElement = document.createElement("img");
    imgElement.className = imgArray[1];
    imgElement.src = imgArray[2];
    return imgElement;
  }
}
//TODO
