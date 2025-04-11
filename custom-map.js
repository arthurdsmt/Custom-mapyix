class CustomMap extends HTMLElement {
  connectedCallback() {
  this.style.display = 'block';
  this.style.backgroundColor = '#f0f0f0';
  this.style.height = '100vh';
  this.style.width = '100%';

  const box = document.createElement('div');
  box.style.width = '200px';
  box.style.height = '200px';
  box.style.backgroundColor = 'blue';
  box.style.position = 'absolute';
  box.style.left = '100px';
  box.style.top = '100px';
  this.appendChild(box);

  console.log("✅ Basic box rendered");
}
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

