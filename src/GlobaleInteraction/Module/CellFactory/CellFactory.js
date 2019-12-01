import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellVideo from "src/GlobaleInteraction/Module/Cell/CellVideo";
import CellMotion from "src/GlobaleInteraction/Module/Cell/CellMotion";
import CellEmpty from "src/GlobaleInteraction/Module/Cell/CellEmpty";
import CellColor from "src/GlobaleInteraction/Module/Cell/CellColor";
import CellReactionDiffusion from "src/GlobaleInteraction/Module/Cell/CellReactionDiffusion";
import CellVectorField from "src/GlobaleInteraction/Module/Cell/CellVectorField";
import CellText from "src/GlobaleInteraction/Module/Cell/CellText";
import CellDomElement from "src/GlobaleInteraction/Module/Cell/CellDomElement";

import shader1 from "src/assets/dev/template";
import shader2 from "src/assets/dev/boomboom";
import shader3 from "src/assets/dev/distortion";
import shader4 from "src/assets/dev/negatif";
import shader5 from "src/assets/dev/sawtooth";
import shader6 from "src/assets/dev/color";
import shader7 from "src/assets/dev/kaleidoscope";

import dat from "dat.gui";


let shaders = [
  shader1,
  shader2,
  shader3,
  shader4,
  shader5,
  shader6,
  shader6,
  shader7
];

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

let cell_rules = {
  image:{
    strength: 20,
    minX: 0,
    maxX: 20,
    minY: 0,
    maxY: 10,
    factory: function({ size }) {
      let cell = new CellImage({
        image: getRandomElement(images),
        shader: getRandomElement(shaders),
        size: size
      });
      return cell;
    }
  },
  video:{
    strength: 30,
    minX: 0,
    maxX: 20,
    minY: 0,
    maxY: 10,
    factory: function({ size, cellData }) {
      let cell = new CellVideo({
        url: cellData.url || getRandomElement(videos),
        shader: getRandomElement(shaders),
        size: size
      });
      return cell;
    }
  },
  motion:{
    strength: 5,
    minX: 0,
    maxX: 20,
    minY: 0,
    maxY: 10,
    factory: function({ size, cellData }) {
      let cell = new CellMotion({
        url: cellData.url || getRandomElement(motions),
        size: size
      });
      return cell;
    }
  },
  color:{
    strength: 5,
    minX: 0,
    maxX: 20,
    minY: 0,
    maxY: 10,
    factory: function ({size}){
      return new CellColor({ size });
    }
  },
  empty:{
    strength: 13,
    minX: 0,
    maxX: 20,
    minY: 0,
    maxY: 10,
    factory: function ({size}){
      return new CellEmpty({ size });
    }
  },
  reactionDiffusion:{
    strength: 7,
    minX: 0,
    maxX: 20,
    minY: 0,
    maxY: 10,
    factory: function ({size, renderer}){
      let reactDiffDataArray = [
        { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 },
        { Da: 1, Db: 0.27, feed: 0.005, k: 0.05 },
        { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 },
        { Da: 1.0, Db: 0.3, feed: 0.055, k: 0.062 }
      ];
      return new CellReactionDiffusion({
        size,
        renderer,
        reacDiffData:
          reactDiffDataArray[
            Math.random() * reactDiffDataArray.length + reactDiffDataArray.length
          ]
      });
    }
  },
  dom:{
    strength: 0,
    minX: 0,
    maxX: 20,
    minY: 0,
    maxY: 10,
    factory: function({size,camera, cellData}){
      return new CellDomElement({size, camera, html: cellData.html});
    }
  }
}

function CellFactory({ size, renderer, camera, cellData }) {
  let _cellData = cellData || {type: GetRandomCellType({size})};
  return cell_rules[_cellData.type].factory({size, renderer, camera, cellData: _cellData});
}

function GetRandomCellType({size}){
  let cells = new Array();
  for (let [name, data] of Object.entries(cell_rules)) {
    if(data.minX <= size.x && data.maxX >= size.x && data.minY <= size.y && data.maxY >= size.y){
      for(let i = 0; i<data.strength; i++){
        cells.push(name);
      }
    }
  }

  return getRandomElement(cells);
}

window.addEventListener("load",function(){
  var gui = new dat.GUI({closeOnTop: true,closed:true});
  for (let [name, data] of Object.entries(cell_rules)) {
    gui.remember(data);
    var folder = gui.addFolder(name);
    folder.add(data, 'strength');
    folder.add(data, 'minX',0,20);
    folder.add(data, 'maxX',0,20);
    folder.add(data, 'minY',0,10);
    folder.add(data, 'maxY',0,10);
  }
});

export default CellFactory;
