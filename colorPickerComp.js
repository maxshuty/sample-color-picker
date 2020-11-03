const colors = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue',
  orange: 'orange',
  pink: 'pink',
});

const template = document.createElement('template');
template.innerHTML = `
  <div>  
      <div class="swatch-card">
      <div class="swatch-main"></div>
      <div class="swatch-selector-container">
      <button data-colorBtn="${colors.red}" aria-label="${colors.red} color selector"></button>
      <button data-colorBtn="${colors.green}" aria-label="${colors.green} color selector"></button>
      <button data-colorBtn="${colors.blue}" aria-label="${colors.blue} color selector"></button>
      <button data-colorBtn="${colors.orange}" aria-label="${colors.orange} color selector"></button>
      <button data-colorBtn="${colors.pink}" aria-label="${colors.pink} color selector"></button>
      </div>
      </div>
  </div>`;

class ColorPicker extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));

    // Storing the reference to setMainBackground here so that
    // we can remove the event listeners from it later
    this.setMainBackgroundColor = (e) => this.setMainBackground(e);
  }

  // Returns a string representing the color of the passed in btn element
  getBtnColor(btn) {
    return btn.currentTarget.getAttribute('data-colorBtn');
  }

  // Setting the main background area color to the color of the clicked button
  setMainBackground(e) {
    // Getting the .swatch-main element
    // TODO Max: There probably is a cleaner way to do this
    const swatchMainEl = e.currentTarget.parentElement.previousElementSibling;
    swatchMainEl.style.backgroundColor = this.getBtnColor(e);
  }

  // Initializing the button background colors
  initBtnBackground(btns) {
    // TODO Max: This can be done via CSS, if these will be dynamically set in the future then this function is good, if not let's get rid of this function and set them via CSS
    btns.forEach((b) => {
      b.style.backgroundColor = b.getAttribute('data-colorBtn');
    });
  }

  // Add event listeners to a group of elements
  addEventListenerToElements(elements, event, callBack, useCapture) {
    elements.forEach((e) => {
      e.addEventListener(event, callBack, useCapture);
    });
  }

  // Remove event listeners from a group of elements
  removeEventListenerFromElements(elements, event, callBack, useCapture) {
    elements.forEach((e) => {
      e.removeEventListener(event, callBack, useCapture);
    });
  }

  connectedCallback() {
    const colorBtns = document.querySelectorAll('[data-colorBtn]');
    this.initBtnBackground(colorBtns);
    this.addEventListenerToElements(
      colorBtns,
      'click',
      this.setMainBackgroundColor,
      false
    );
  }

  disconnectedCallback() {
    const colorBtns = document.querySelectorAll('[data-colorBtn]');
    this.removeEventListenerFromElements(
      colorBtns,
      'click',
      this.setMainBackgroundColor,
      false
    );
  }
}

customElements.define('color-picker', ColorPicker);

/* TODO: Max P - move this to a separate JS file */
function addAnotherColorPicker() {
  const swatchContainer = document.getElementById('swatchContainer');
  swatchContainer.appendChild(new ColorPicker());
}
