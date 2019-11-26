import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellVideo from "src/GlobaleInteraction/Module/Cell/CellVideo";
import CellEmpty from "src/GlobaleInteraction/Module/Cell/CellEmpty";
import CellColor from "src/GlobaleInteraction/Module/Cell/CellColor";
import CellReactionDiffusion from "src/GlobaleInteraction/Module/Cell/CellReactionDiffusion";

import shader1 from "src/assets/dev/template";
import shader2 from "src/assets/dev/boomboom";
import shader3 from "src/assets/dev/distortion";
import shader4 from "src/assets/dev/negatif";

import image from "src/assets/image/immeuble.jpg";
import image2 from "src/assets/image/stairs.jpg";

import video_vieux from "src/assets/video/vieux.webm";
import video_dj from "src/assets/video/dj.webm";
import video_acidland from "src/assets/video/acidland.webm";

let images = [image, image2];

let shaders = [shader1, shader2, shader3, shader4];

let videos = [video_vieux, video_dj, video_acidland];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function CellFactory({ size ,renderer}) {
  //return new CellReactionDiffusion({ size,renderer });

  let percent = Math.random() * 100;
  let current = 0;

  function CheckPercent(chance) {
    let test = percent <= chance + current;
    current += chance;
    return test;
  }

  if (CheckPercent(30)) {
    return CellVideoFactory({ size });
  } else if (CheckPercent(10)) {
    return new CellColor({ size, color: "#78FFA1" });
  } else if (CheckPercent(13)) {
    return new CellEmpty({ size });
  } else if (CheckPercent(30)) {
    
    return new CellReactionDiffusion({ size,renderer });
  } else {
    return CellImageFactory({ size });
  }
}

function CellImageFactory({ size }) {
  let cell = new CellImage({
    image: getRandomElement(images),
    shader: getRandomElement(shaders),
    size: size
  });
  return cell;
}

function CellVideoFactory({ size }) {
  let cell = new CellVideo({
    url: getRandomElement(videos),
    shader: getRandomElement(shaders),
    size: size
  });
  return cell;
}

export default CellFactory;
