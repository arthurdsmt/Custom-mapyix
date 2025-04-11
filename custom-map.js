class CustomMap extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.style.width = '100%';
    this.style.height = '100vh';
    this.style.backgroundColor = '#f5f5f5';

    const NUM_OBJECTS = 50;
    const MAP_SIZE = 100 * NUM_OBJECTS;
    const VIEW_RADIUS = 2000;
    const REPULSION_STRENGTH = 50000;
    const DAMPING = 0.9;
    const CENTER_PULL = 0.05;

    const centerX = MAP_SIZE / 2;
    const centerY = MAP_SIZE / 2;
    
    const aspectRatios = [
      { width: 4, height: 3 },
      { width: 16, height: 9 },
      { width: 1, height: 1 },
      { width: 3, height: 4 },
      { width: 9, height: 16 },
    ];

    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.left = "0";
    wrapper.style.top = "0";
    wrapper.style.width = `${MAP_SIZE}px`;
    wrapper.style.height = `${MAP_SIZE}px`;
    this.appendChild(wrapper);

    const objects = Array.from({ length: NUM_OBJECTS }).map((_, i) => {
      const ratio = aspectRatios[i % aspectRatios.length];
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const color = `rgb(${r}, ${g}, ${b})`;
      return {
        id: i,
        x: centerX + (Math.random() - 0.5) * 100,
        y: centerY + (Math.random() - 0.5) * 100,
        vx: 0,
        vy: 0,
        widthRatio: ratio.width,
        heightRatio: ratio.height,
        color,
        name: `Project ${i + 1}`,
        company: `Company ${i % 3 + 1}`,
        year: 2020 + (i % 5),
      };
    });

    // Force-directed simulation
    for (let iter = 0; iter < 100; iter++) {
      for (let i = 0; i < objects.length; i++) {
        let fx = 0;
        let fy = 0;
        for (let j = 0; j < objects.length; j++) {
          if (i === j) continue;
          const dx = objects[i].x - objects[j].x;
          const dy = objects[i].y - objects[j].y;
          const distSq = dx * dx + dy * dy + 0.01;
          const force = REPULSION_STRENGTH / distSq;
          fx += (dx / Math.sqrt(distSq)) * force;
          fy += (dy / Math.sqrt(distSq)) * force;
        }
        const toCenterX = centerX - objects[i].x;
        const toCenterY = centerY - objects[i].y;
        fx += toCenterX * CENTER_PULL;
        fy += toCenterY * CENTER_PULL;
        objects[i].vx = (objects[i].vx + fx) * DAMPING;
        objects[i].vy = (objects[i].vy + fy) * DAMPING;
      }
      for (let i = 0; i < objects.length; i++) {
        objects[i].x += objects[i].vx;
        objects[i].y += objects[i].vy;
      }
    }

    // Render objects
    objects.forEach(obj => {
      const el = document.createElement("div");
      const maxHeight = 150;
      const maxWidth = (obj.widthRatio / obj.heightRatio) * maxHeight;
      el.style.width = `${maxWidth}px`;
      el.style.height = `${maxHeight}px`;
      el.style.background = obj.color;
      el.style.position = "absolute";
      el.style.left = `${obj.x}px`;
      el.style.top = `${obj.y}px`;
      el.style.borderRadius = "10px";
      el.style.border = "1px solid black";
      el.style.opacity = "0.9";
      el.title = `${obj.name}\n${obj.company}\n${obj.year}`;

      wrapper.appendChild(el);
    });
  }
}

customElements.define("custom-map", CustomMap);

