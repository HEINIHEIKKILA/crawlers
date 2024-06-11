let kuvat = [];
let kuvatData = [];
let alphaValues = [210, 100, 110, 100, 100, 90, 110, 80, 70, 50, 100, 76];
let video;
let speedFactor = 4;
let noiseOffsetX = 100;
let noiseOffsetY = 150; // Eri offset arvo Y-akselille

function preload() {
  kuvat[0] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[1] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[2] = loadImage('Bubblegum-coral-Paragorgia-sp-from-Atlantis-Bank-Seamount-South-West-Indian-Ridge.ppm');
  kuvat[3] = loadImage('Image 9.6.2024 at 10.36.jpg');
  kuvat[4] = loadImage('Image 9.6.2024 at 10.39.jpg');
  kuvat[5] = loadImage('Image 9.6.2024 at 7.47.jpg');
  kuvat[6] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[7] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[8] = loadImage('Image 10.6.2024 at 12.44.jpg');
  kuvat[9] = loadImage('Image 9.6.2024 at 10.41.jpg');
  kuvat[10] = loadImage('Screenshot 2024-06-09 at 14.00.33.png');
  kuvat[11] = loadImage('Image 9.6.2024 at 10.39.jpg');
  video = createVideo(['untitled.mp4']); // Vaihda 'untitled.mov' videon polkuun omalla koneellasi
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video.loop(); // Toista video automaattisesti
  video.speed(500 / speedFactor); // Hidasta videon toistoa

  // Alustetaan kuvatiedot
  for (let i = 0; i < kuvat.length; i++) {
    kuvat[i].resize(10, 0); // Skaalaa kuvat samanlevyisiksi, mutta säilyttää suhteen
    kuvatData.push({
      x: random(1),
      y: random(1),
      img: kuvat[i],
      noiseOffsetX: random(500), // Eri noise offset jokaiselle kuvalle
      noiseOffsetY: random(5000) + 1000, // Eri noise offset jokaiselle kuvalle
      alpha: alphaValues[i]
    });
  }
}

function draw() {
  background(0, 110, 30, 5); // Vaaleansininen tausta

  // Piirretään ja liikutetaan kuvia sumuisella aaltoliikkeellä
  for (let i = 0; i < kuvat.length; i++) {
    let imgData = kuvatData[i];
    let img = imgData.img;
    
    let offsetX = map(noise(imgData.noiseOffsetX), 1, 0, -500, 1);
    let offsetY = map(noise(imgData.noiseOffsetY), 1, 0, -500, 10);
    
    let alpha = imgData.alpha; // Käytetään ennalta määriteltyä alfa-arvoa
    
    tint(500, alpha); // Sumuisuus ja läpinäkyvyys
    image(img, imgData.x * 500 + offsetX, imgData.y * 500 + offsetY);
    
    imgData.noiseOffsetX += 0.001;
    imgData.noiseOffsetY += 0.001;
  }

  // Näytetään video sumuisena ja blendataan kuviin
  blendMode(BLEND); // Valitse sopiva blend mode
  tint(100, 20, 10, 5); // Puoliläpinäkyvyys videolle
  image(video, 1, 1, width, height);
  blendMode(OVERLAY); // Palauta normaali blend mode
}
