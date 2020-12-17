const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ctx.globalCompositeOperation = 'destination-over';
const edge = 80;
const particleScale = 5;

let drawing = false;

class Root {
   constructor(x, y, color, centerX, centerY) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.speedX = 0;
      this.speedY = 0;
      this.centerX = centerX;
      this.centerY = centerY;
   }

   // THIS HAS TO BE AN ARROW FUNCTION :)
   draw = () => {
      this.speedX += (Math.random() - 0.5) / 2;
      this.speedY += (Math.random() - 0.5) / 2;
      this.x += this.speedX;
      this.y += this.speedY;

      const distX = this.x - this.centerX;
      const distY = this.y - this.centerY;
      const distance = Math.sqrt(distX**2 + distY**2);

      // a decaying particle size, for fun
      const radius = (-distance / edge + 1) * edge / particleScale;

      if (radius > 0) {
         requestAnimationFrame(this.draw); // use .bind if not using arrow functions
         ctx.beginPath();
         ctx.arc(this.x, this.y, radius, 0, 2*Math.PI);
         ctx.fillStyle = this.color;
         ctx.fill();
         ctx.strokeStyle = 'black';
         ctx.stroke();
      }
   }
}

const doArt = (event) => {
   const x = event.offsetX || event.layerX || event.x;
   const y = event.offsetY || event.layerY || event.y;
   for (let i=0; i<3; i++) {
      const root = new Root(x, y, 'pink', x, y);
      root.draw();
   }
}

// Update canvas size to scale with the window resize events
window.addEventListener('resize', () => {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
});

// Activate on click (comment out if mousemove is enabled)
window.addEventListener('click', doArt);

// Uncomment these lines to active 'on mouse move'
/*
window.addEventListener('mousemove', (event) => {
   if (!drawing) return;
   // ctx.fillStyle = 'rgba(0, 0, 255, 0.03)';
   // ctx.fillRect(0, 0, canvas.width, canvas.height);
   doArt(event);
});

window.addEventListener('mousedown', () => drawing = true);
window.addEventListener('mouseup', () => drawing = false);
*/