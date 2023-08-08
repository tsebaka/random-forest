let resizeReset = function() {
  w = canvasBody.width = document.documentElement.scrollWidth;
  h = canvasBody.height = document.documentElement.scrollHeight;
}

let particleAmount = Math.floor(document.documentElement.scrollHeight / 10.0);

const opts = { 
  particleColor: "rgb(234,191,82)",
  lineColor: "rgb(200,200,200)",
  particleAmount: particleAmount,
  defaultSpeed: 0.3,
  variantSpeed: 0.3,
  defaultRadius: 2,
  variantRadius: 2,
  linkRadius: 150,
};

window.addEventListener("resize", function(){
  deBouncer();
});

let deBouncer = function() {
    clearTimeout(tid);
    tid = setTimeout(function() {
        resizeReset();
    }, delay);
};

let checkDistance = function(x1, y1, x2, y2){ 
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function(point1, hubs){ 
  for (let i = 0; i < hubs.length; i++) {
    let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
    let opacity = 1 - distance / opts.linkRadius;
    if (opacity > 0) { 
      drawArea.lineWidth = 0.5;
      drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
      drawArea.beginPath();
      drawArea.moveTo(point1.x, point1.y);
      drawArea.lineTo(hubs[i].x, hubs[i].y);
      drawArea.closePath();
      drawArea.stroke();
    }
  }
}

Particle = function(xPos, yPos){ 
  this.x = Math.random() * w; 
  this.y = Math.random() * h;
  this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed; 
  this.directionAngle = Math.floor(Math.random() * 360); 
  this.color = opts.particleColor;
  this.radius = opts.defaultRadius + Math.random() * opts. variantRadius; 
  this.vector = {
    x: Math.cos(this.directionAngle) * this.speed,
    y: Math.sin(this.directionAngle) * this.speed
  };
  this.update = function(){ 
    this.border(); 
    this.x += this.vector.x; 
    this.y += this.vector.y; 
  };
  this.border = function(){ 
    if (this.x >= w || this.x <= 0) { 
      this.vector.x *= -1;
    }
    if (this.y >= h || this.y <= 0) {
      this.vector.y *= -1;
    }
    if (this.x > w) this.x = w;
    if (this.y > h) this.y = h;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0; 
  };
  this.draw = function(){ 
    drawArea.beginPath();
    drawArea.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    drawArea.closePath();
    drawArea.fillStyle = this.color;
    drawArea.fill();
  };
};

function setup(){ 
  particles = [];
  resizeReset();
  for (let i = 0; i < opts.particleAmount; i++){
    particles.push( new Particle() );
  }
  window.requestAnimationFrame(loop);
}

function loop(){ 
  window.requestAnimationFrame(loop);
  drawArea.clearRect(0,0,w,h);
  for (let i = 0; i < particles.length; i++){
    particles[i].update();
    particles[i].draw();
  }
  for (let i = 0; i < particles.length; i++){
    linkPoints(particles[i], particles);
  }
}

const canvasBody = document.getElementById("canvas"),
drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();

// const resolver = {
//   resolve: function resolve(options, callback) {
//     const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
//     const combinedOptions = Object.assign({}, options, {resolveString: resolveString});
    
//     function getRandomInteger(min, max) {
//       return Math.floor(Math.random() * (max - min + 1)) + min;
//     };
    
//     function randomCharacter(characters) {
//       return characters[getRandomInteger(0, characters.length - 1)];
//     };
    
//     function doRandomiserEffect(options, callback) {
//       const characters = options.characters;
//       const timeout = options.timeout;
//       const element = options.element;
//       const partialString = options.partialString;

//       let iterations = options.iterations;

//       setTimeout(() => {
//         if (iterations >= 0) {
//           const nextOptions = Object.assign({}, options, {iterations: iterations - 1});

//           if (iterations === 0) {
//             element.textContent = partialString;
//           } else {
//             element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
//           }

//           doRandomiserEffect(nextOptions, callback)
//         } else if (typeof callback === "function") {
//           callback(); 
//         }
//       }, options.timeout);
//     };
    
//     function doResolverEffect(options) {
//       const resolveString = options.resolveString;
//       const characters = options.characters;
//       const offset = options.offset;
//       const partialString = resolveString.substring(0, offset);
//       const combinedOptions = Object.assign({}, options, {partialString: partialString});

//       doRandomiserEffect(combinedOptions, () => {
//         const nextOptions = Object.assign({}, options, {offset: offset + 1});

//         if (offset <= resolveString.length) {
//           doResolverEffect(nextOptions);
//         }
//       });
//     };

//     doResolverEffect(combinedOptions);
//   } 
// }

// const strings = [
//   'RANDOM FOREST'
// ];

// let counter = 0;

// const options = {
//   offset: 1,
//   timeout: 36,
//   iterations: 18,
//   characters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'X', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
//   resolveString: strings[counter],
//   element: document.querySelector('[data-target-resolver]')
// }

// function callback() {
//   setTimeout(() => {
//     counter++;
    
//     if (counter >= strings.length) {
//       counter = 0;
//     }
    
//     let nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
//     resolver.resolve(nextOptions, callback);
//   }, 1000);
// }

// resolver.resolve(options, callback);

var dictionary = "0123456789QWERTYUIOPASDFGHJKLZXCVBNM!?></\A`~+*=@#$%".split('');

var el = document.querySelector('.heading');

var ran = function() {
 return Math.floor(Math.random() * dictionary.length)
}

var ranString = function(amt) {
  var string = '';
  for(var i = 0; i < amt; i++) {
    string += dictionary[ran()];
  }
  return string;
}

var init = function(str) {
  var count = str.length;
  var delay = 50;
  
  el.innerHTML = '';
  
  var gen = setInterval(function() {
    el.setAttribute('data-after', ranString(count));
    if(delay > 0) {
      delay--;
    }
    else {
      if(count < str.length) {
        el.innerHTML += str[str.length - count-1];
      }
      count--;
      if(count === -1) {
        clearInterval(gen);
      }
    }
  }, 100);
}

init('RANDOM FOREST');
