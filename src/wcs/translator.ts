fetch("http://localhost:8080/static/html/translator.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

const define = (html: string): void => {
  class Translator extends HTMLElement {
    languages = {
      DE: "German",
      SWE: "Swedish",
      ENG: "English",
    };

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = html;

      // fetch the enum values for languages
      this.getLanguages();
    }

    connectedCallback() {
      const submitBtn = this.shadowRoot.querySelector("#submit-btn");

      submitBtn.addEventListener("click", this.translateText.bind(this)); // binds the function to the class instance
    }

    getLanguages() {
      fetch("http://localhost:8080/translations/languages")
        .then((response) => response.json())
        .then((result) => {
          if (result.data) this.populateSelect(result.data);
        })
        .catch((error) => {
          console.error("Error fetching enum values:", error);
        });
    }

    populateSelect(enums) {
      if (!enums) return;
      const selects = this.shadowRoot.querySelectorAll(
        ".select-group > select"
      );

      for (let i = 0; i < selects.length; i++) {
        selects[i].innerHTML = ""; // Clear existing options
        enums.forEach((enumValue) => {
          if (!this.languages[enumValue]) return;

          const option = document.createElement("option");
          option.value = enumValue;
          option.textContent = this.languages[enumValue];
          selects[i].appendChild(option);
        });
      }
    }

    translateText() {
      const from = this.shadowRoot.querySelector(
        "#from-languages"
      ) as HTMLSelectElement;
      const to = this.shadowRoot.querySelector(
        "#to-languages"
      ) as HTMLSelectElement;
      const textArea = this.shadowRoot.querySelector(
        "#text-area"
      ) as HTMLTextAreaElement;

      if (from && from.value && to && to.value && textArea && textArea.value) {
        fetch("http://localhost:8080/translations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            lang: {
              to: to.value,
              from: from.value,
            },
            text: textArea.value,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.data) {
              const translationTextArea = this.shadowRoot.querySelector(
                "#translation"
              ) as HTMLTextAreaElement;

              const { text } = result.data;
              if (translationTextArea && text) translationTextArea.value = text;
            }
          })
          .catch((error) => {
            console.error("Error fetching enum values:", error);
          });
      }
    }
  }

  customElements.define("wcs-translator", Translator);
};

export default define;
