import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellVideo from "src/GlobaleInteraction/Module/Cell/CellVideo";
import shader1 from "src/assets/dev/template";
import shader2 from "src/assets/dev/boomboom";
import shader3 from "src/assets/dev/distortion";

import image from "src/assets/image/immeuble.jpg";
import image2 from "src/assets/image/stairs.jpg";

import video_vieux from "src/assets/video/vieux.webm";
import video_dj from "src/assets/video/dj.webm";
import video_acidland from "src/assets/video/acidland.webm";

let images = [
    image,
    image2
];

let shaders = [
   // shader1,
   // shader2,
    shader3
];

let videos = [
    video_vieux,
    video_dj,
    video_acidland
];

function getRandomElement(array){
    return array[Math.floor(Math.random()*array.length)];
}

function CellFactory({ size }) {
    if(Math.random() > 0.5){
        return CellVideoFactory({ size });
    }else{
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