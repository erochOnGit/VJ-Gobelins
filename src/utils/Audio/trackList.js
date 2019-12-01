import Feiern from "src/assets/musics/001_Feiern_Solee.mp3";
import Dockyard from "src/assets/musics/002_Dockyard_PaulKalkbrenner.mp3"
import Soul from "src/assets/musics/003_Soul_RivalConsoles.mp3"
import ShemalesBody from "src/assets/musics/004_ShemalesBody_BirdyNamNam.mp3"
import Acidland from "src/assets/musics/005_Acidland_Contrefacon.mp3"
import EyeNyamNam from "src/assets/musics/006_EyeNyamNam_A_Mensuro_EboTaylor.mp3"
import SoW3ll from "src/assets/musics/007_SoW3ll_NakatomiPlaza.mp3"
import Sex from "src/assets/musics/008_SexBonusTrack_BlackLoops.mp3"
import Pulverturm from "src/assets/musics/009_Pulverturm_DJTomcraftRemix_NielsVanGogh.mp3"
import WithoutU from "src/assets/musics/010_WithoutU_RickyRazu.mp3"
import LadyScience from "src/assets/musics/011_LadyScienceNYCSunrise_SoulCapsule.mp3"
import Wormhole from "src/assets/musics/012_Wormhole_Bastinov.mp3"
import techno from "src/assets/musics/techno.mp3"
import amandoon from "src/assets/musics/amandoon.mp3"
import dat from "dat.gui";

let trackList = {
  0: {
    name: "Solee",
    artist: "Feiern",
    url: Feiern,
    tags: "tags",
    genre: "after_06h-10h",
    bpm: "122",
    color: "#78FFA1"
  },

  1: {
    name: "Dockyard",
    artist: "Paul Kalkbrenner",
    url: Dockyard,
    tags: "tags",
    genre: "dance_14h-18h",
    bpm: "114",
    color: "#ff0000"
  },

  2: {
    name: "Soul",
    artist: "Rival Consoles",
    url: Soul,
    tags: "tags",
    genre: "afterwork_18h-23h",
    bpm: "100",
    color: "#78FFA1"
  },

  3: {
    name: "Shemales Body",
    artist: "Birdy Nam Nam",
    url: ShemalesBody,
    tags: "tags",
    genre: "warmup_23h-02h",
    bpm: "128",
    color: "#78FFA1"
  },

  4: {
    name: "Acidland",
    artist: "Contrefacon",
    url: Acidland,
    tags: "tags",
    genre: "partyhard_02h-06h",
    bpm: "145",
    color: "#78FFA1"
  },

  5: {
    name: "Eye Nyam Nam'A'Mensuro",
    artist: "Ebo Taylor",
    url: EyeNyamNam,
    tags: "tags",
    genre: "chill_10h-14h",
    bpm: "124",
    color: "#78FFA1"
  },

  6: {
    name: "So W3ll",
    artist: "Nakatomi Plaza",
    url: SoW3ll,
    tags: "tags",
    genre: "chill_10h-14h",
    bpm: "122",
    color: "#78FFA1"
  },

  7: {
    name: "Sex - Bonus Track",
    artist: "Black Loops",
    url: Sex,
    tags: "tags",
    genre: "afterwork_18h-23h",
    bpm: "121",
    color: "#78FFA1"
  },

  8: {
    name: "Pulverturm (DJ Tomcraft Remix)",
    artist: "Niels Van Gogh",
    url: Pulverturm,
    tags: "tags",
    genre: "warmup_23h-02h",
    bpm: "136",
    color: "#78FFA1"
  },
  9: {
    name: "Without U",
    artist: "Ricky Razu",
    url: WithoutU,
    tags: "tags",
    genre: "dance_14h-18h",
    bpm: "127",
    color: "#78FFA1"
  },

  10: {
    name: "Lady Science - NYC Sunrise",
    artist: "Soul Capsule",
    url: LadyScience,
    tags: "tags",
    genre: "after_06h-10h",
    bpm: "128",
    color: "#78FFA1"
  },
  11: {
    name: "Wormhole",
    artist: "Bastinov",
    url: Wormhole,
    tags: "tags",
    genre: "partyhard_02h-06h",
    bpm: "130",
    color: "#78FFA1"
  },
  12: {
    name: "Techno toujours pareil",
    artist: "Salut c'est cool",
    url: techno,
    tags: "tags",
    genre: "partyhard_02h-06h",
    bpm: "130",
    color: "#FF69B4"
  },
  12: {
    name: "Le temps est bon",
    artist: "Degiheugi",
    url: amandoon,
    tags: "tags",
    genre: "partyhard_02h-06h",
    bpm: "120",
    color: "#FF69B4"
  },
  
};

window.addEventListener("load",function(){
  var gui = new dat.GUI({closeOnTop: true,closed:true});
  for (let [key, track] of Object.entries(trackList)) {
   gui.remember(track);
   let foldername = track.artist +" - "+ track.name;
   foldername = foldername.length > 40 ? foldername.substring(0,37)+"..." : foldername;
    var folder = gui.addFolder(foldername);
    folder.add(track, 'name');
    folder.add(track, 'artist');
    folder.add(track, 'tags');
    folder.add(track, 'genre', { chill:"chill_10h-14h",dance:"dance_14h-18h",afterwork:"afterwork_18h-23h",warmup:"warmup_23h-02h",partyhard:"partyhard_02h-06h",after:"after_06h-10h" } );
    folder.add(track, 'bpm');
    folder.addColor(track, 'color');
  }
});


export default trackList
