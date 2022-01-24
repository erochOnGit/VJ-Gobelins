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
    name: "Eye Nyam Nam'A'Mensuro",
    artist: "Ebo Taylor",
    url: EyeNyamNam,
    tags: "soulful,upbeat,hopeful,sunny,enthusiastic,good morning",
    genre: "chill_10h-14h",
    bpm: "124",
    color: "#FFA1D0",
    saturation : 0.5
  },

  1: {
    name: "So W3ll",
    artist: "Nakatomi Plaza",
    url: SoW3ll,
    tags: "bouncy,chirpy,groovy,8-bit,wake up, good vibes,cruising,",
    genre: "chill_10h-14h",
    bpm: "122",
    color: "#FFA1D0",
    saturation : 0.5
  },

  2: {
    name: "Dockyard",
    artist: "Paul Kalkbrenner",
    url: Dockyard,
    tags: "pure bliss,right here right now,melancholy,melody,living by the seaside,",
    genre: "dance_14h-18h",
    bpm: "114",
    color: "#FEBC00",
    saturation : 0.5
  },

  3: {
    name: "Without U",
    artist: "Ricky Razu",
    url: WithoutU,
    tags: "mellow vibes,house music,sunrise,fresh early cold air,summer sunshine,smooth,relaxing,cozy beat",
    genre: "dance_14h-18h",
    bpm: "127",
    color: "#FEBC00",
    saturation : 0.5
  },

  4: {
    name: "Sex - Bonus Track",
    artist: "Black Loops",
    url: Sex,
    tags: "emotional,food for soul,lo-fi house,are these feelings even real ?,or are they just programming,bassy",
    genre: "afterwork_18h-22h",
    bpm: "121",
    color: "#51CCFF",
    saturation : 0.5
  },

  5: {
    name: "Soul",
    artist: "Rival Consoles",
    url: Soul,
    tags: "arpeggios,jerky beat,orchestral,symphonic,twitching",
    genre: "afterwork_18h-22h",
    bpm: "100",
    color: "#51CCFF",
    saturation : 0.5
  },

  6: {
    name: "Shemales Body",
    artist: "Birdy Nam Nam",
    url: ShemalesBody,
    tags: "dance or die,pulsating rhythm,get ready,electronic,very bad trip",
    genre: "warmup_22h-02h",
    bpm: "128",
    color: "#78FFA1",
    saturation : 0.5
  },

  7: {
    name: "Pulverturm (DJ Tomcraft Remix)",
    artist: "Niels Van Gogh",
    url: Pulverturm,
    tags: "can i get a hand,i'm kinda falling,in my life,trippy ",
    genre: "warmup_22h-02h",
    bpm: "136",
    color: "#78FFA1",
    saturation : 0.5
  },

  8: {
    name: "Acidland",
    artist: "Contrefacon",
    url: Acidland,
    tags: "LSD,ecstasy,MDMA,aciiiiiiiiid,troubled vision,under influence,turn up,heavy bass",
    genre: "partyhard_02h-06h",
    bpm: "145",
    color: "#7C54FF",
    saturation : 0.5
  },

  9: {
    name: "Wormhole",
    artist: "Bastinov",
    url: Wormhole,
    tags: "909 groove,psychedelic techno,dark,ruthless banger,stomper",
    genre: "partyhard_02h-06h",
    bpm: "130",
    color: "#7C54FF",
    saturation : 0.5
  },

  10: {
    name: "Solee",
    artist: "Feiern",
    url: Feiern,
    tags: "deep techno,hammer kick,synth paradise,oppression",
    genre: "after_06h-10h",
    bpm: "122",
    color: "#12A481",
    saturation : 0.5
  },

 11: {
    name: "Lady Science - NYC Sunrise",
    artist: "Soul Capsule",
    url: LadyScience,
    tags: "nostalgic feeling,deep house,forever timeless,head in space,emotional journey,goosebumps",
    genre: "after_06h-10h",
    bpm: "128",
    color: "#12A481",
    saturation : 0.5
  },
 
}

window.addEventListener("load",function(){
 //GUI();
});

function GUI(){
  var gui = new dat.GUI({closeOnTop: true,closed:true});
  for (let [key, track] of Object.entries(trackList)) {
   gui.remember(track);
   let foldername = track.artist +" - "+ track.name;
   foldername = foldername.length > 40 ? foldername.substring(0,37)+"..." : foldername;
    var folder = gui.addFolder(foldername);
    folder.add(track, 'name');
    folder.add(track, 'artist');
    folder.add(track, 'tags');
    folder.add(track, 'genre', { chill:"chill_10h-14h",dance:"dance_14h-18h",afterwork:"afterwork_18h-22h",warmup:"warmup_22h-02h",partyhard:"partyhard_02h-06h",after:"after_06h-10h" } );
    folder.add(track, 'bpm');
    folder.addColor(track, 'color');
    folder.add(track, 'saturation',0,2);
  }
}


export default trackList;