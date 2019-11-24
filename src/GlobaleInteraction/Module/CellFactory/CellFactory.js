import CellImage from "src/GlobaleInteraction/Module/Cell/CellImage";
import CellVideo from "src/GlobaleInteraction/Module/Cell/CellVideo";
import shader1 from "src/assets/dev/template";
import shader2 from "src/assets/dev/boomboom";
import image from "src/assets/image/ARP_B_Immeuble_01.jpg";
import image2 from "src/assets/image/cyberpunk.jpg";

import url from "src/assets/video/ARV_A_Vieux_02.webm";

let images = [
    image,
    image2
]

function getRandomElement(array){
    return array[Math.floor(Math.random()*array.length)];
}

function CellFactory({ size }) {
    let cell = new CellImage({
        image: getRandomElement(images),
        shader: shader1,
        size: size
    });
    return cell;
}

export default CellFactory;