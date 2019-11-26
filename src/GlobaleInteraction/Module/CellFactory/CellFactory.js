import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellVideo from "src/GlobaleInteraction/Module/Cell/CellVideo";
import CellEmpty from "src/GlobaleInteraction/Module/Cell/CellEmpty";
import CellColor from "src/GlobaleInteraction/Module/Cell/CellColor";
import CellReactionDiffusion from "src/GlobaleInteraction/Module/Cell/CellReactionDiffusion";
import CellSplitscan from "src/GlobaleInteraction/Module/Cell/CellSplitscan";

import shader1 from "src/assets/dev/template";
import shader2 from "src/assets/dev/boomboom";
import shader3 from "src/assets/dev/distortion";
import shader4 from "src/assets/dev/negatif";
let shaders = [shader1, shader2, shader3, shader4];

function importAll(r) {
  return r.keys().map(r);
}

let images = importAll(require.context('src/assets/image', false, /\.(png|jpe?g|svg)$/));
let videos = importAll(require.context('src/assets/video', false, /\.(webm)$/));

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function CellFactory({ size, renderer }) {
  
  let reactDiffDataArray = [
    { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 },
    { Da: 1., Db: 0.27, feed: 0.005, k: 0.05  },
    { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 },
    { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 }
  ];

  return new CellReactionDiffusion({
    size,
    renderer,
    reacDiffData:
      reactDiffDataArray[
        0//Math.random() * reactDiffDataArray.length + reactDiffDataArray.length
      ]
  });

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
    return new CellReactionDiffusion({ size, renderer });
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

function CellSplitscanFactory({ size }) {
  let cell = new CellSplitscan({
    url: getRandomElement(videos),
    size: size
  });
  return cell;
}

export default CellFactory;
