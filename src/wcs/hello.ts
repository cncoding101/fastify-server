import { helper } from "@/utils/helpers";

console.log("hello world12", helper);

fetch("http://localhost:8080/static/html/hello.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

const define = (html: string): void => {
  class Translator extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = html;
    }
  }

  customElements.define("wcs-translator", Translator);
};

export default define;
