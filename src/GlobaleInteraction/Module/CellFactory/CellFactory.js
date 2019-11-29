import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellVideo from "src/GlobaleInteraction/Module/Cell/CellVideo";
import CellMotion from "src/GlobaleInteraction/Module/Cell/CellMotion";
import CellEmpty from "src/GlobaleInteraction/Module/Cell/CellEmpty";
import CellColor from "src/GlobaleInteraction/Module/Cell/CellColor";
import CellReactionDiffusion from "src/GlobaleInteraction/Module/Cell/CellReactionDiffusion";
import CellText from "src/GlobaleInteraction/Module/Cell/CellText";
import CellDomElement from "src/GlobaleInteraction/Module/Cell/CellDomElement";
//import CellSplitscan from "src/GlobaleInteraction/Module/Cell/CellSplitscan";

import shader1 from "src/assets/dev/template";
import shader2 from "src/assets/dev/boomboom";
import shader3 from "src/assets/dev/distortion";
import shader4 from "src/assets/dev/negatif";
import shader5 from "src/assets/dev/sawtooth";
import shader6 from "src/assets/dev/color";
import shader7 from "src/assets/dev/kaleidoscope";
let shaders = [shader1, shader2, shader3, shader4, shader5, shader6, shader7];

function importAll(r) {
  return r.keys().map(r);
}

let images = importAll(
  require.context("src/assets/image", false, /\.(png|jpe?g|svg)$/)
);
let videos = importAll(
  require.context("src/assets/video", false, /\.(webm|mp4)$/)
);

let motions = importAll(
  require.context("src/assets/motion", false, /\.(webm|mp4)$/)
);

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function CellFactory({ size, renderer, camera }) {
  let percent = Math.random() * 100;
  let current = 0;

 

//  return new CellText({size});

  function CheckPercent(chance) {
    let test = percent <= chance + current;
    current += chance;
    return test;
  }

  if (CheckPercent(30)) {
    return CellVideoFactory({ size });
  } else if (CheckPercent(5)) {
    return new CellColor({ size });
  } else if (CheckPercent(13)) {
    return new CellEmpty({ size });
  }else if(CheckPercent(5)){
    return CellMotionFactory({size});
  } else if (CheckPercent(7)) {
    let reactDiffDataArray = [
      { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 },
      { Da: 1, Db: 0.27, feed: 0.005, k: 0.05 },
      { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 },
      { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 }
    ];
    return new CellReactionDiffusion({
      size,
      renderer,
      reacDiffData: reactDiffDataArray[Math.random() * reactDiffDataArray.length + reactDiffDataArray.length]
    });
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


function CellMotionFactory({ size }) {
  let cell = new CellMotion({
    url: getRandomElement(motions),
    size: size
  });
  return cell;
}


/*function CellSplitscanFactory({ size }) {
  let cell = new CellSplitscan({
    url: getRandomElement(videos),
    size: size
  });
  return cell;
}*/

export default CellFactory;
