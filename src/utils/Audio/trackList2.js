import Feiern from "src/assets/musics/emenez.mp3";
import Dockyard from "src/assets/musics/March of the Resistance.mp3"
import Soul from "src/assets/musics/When the Hammer Falls.mp3"
import ShemalesBody from "src/assets/musics/The Avengers.mp3"
import Acidland from "src/assets/musics/March of the Resistance.mp3"
import EyeNyamNam from "src/assets/musics/When the Hammer Falls.mp3"
import SoW3ll from "src/assets/musics/The Avengers.mp3"
import Sex from "src/assets/musics/March of the Resistance.mp3"
import Pulverturm from "src/assets/musics/When the Hammer Falls.mp3"
import WithoutU from "src/assets/musics/The Avengers.mp3"
import LadyScience from "src/assets/musics/March of the Resistance.mp3"
import Wormhole from "src/assets/musics/When the Hammer Falls.mp3"
import techno from "src/assets/musics/The Avengers.mp3"
import whatislve from "src/assets/musics/whatislve.mp3"
import dat from "dat.gui";

let trackList2 = {
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
    url: whatislve,
    tags: "tags",
    genre: "partyhard_02h-06h",
    bpm: "120",
    color: "#FF69B4"
  },
  
};

window.addEventListener("load",function(){
  return;
  var gui = new dat.GUI({closeOnTop: true,closed:true});
  for (let [key, track] of Object.entries(trackList2)) {
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


export default trackList2
