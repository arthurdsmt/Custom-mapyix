class CustomMap extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.style.backgroundColor = '#f0f0f0';
    this.style.height = '100vh';
    this.style.width = '100%';
    this.style.position = 'relative';

    const box = document.createElement('div');
    box.style.width = '200px';
    box.style.height = '200px';
    box.style.backgroundColor = 'blue';
    box.style.position = 'absolute';
    box.style.left = '100px';
    box.style.top = '100px';
    box.style.border = '2px solid black';
    this.appendChild(box);

    console.log("✅ Basic box rendered");
  }
}

customElements.define("custom-map", CustomMap);
