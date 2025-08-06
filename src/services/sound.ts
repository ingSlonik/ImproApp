import Sound from 'react-native-sound';

import type { Lang } from './language';

const tik = new Sound('tik.mp3', Sound.MAIN_BUNDLE);
const tak = new Sound('tak.mp3', Sound.MAIN_BUNDLE);
const tenCs = [new Sound('ten_cs_1.mp3', Sound.MAIN_BUNDLE), new Sound('ten_cs_2.mp3', Sound.MAIN_BUNDLE)];
const halfCs = [new Sound('half_cs_1.mp3', Sound.MAIN_BUNDLE), new Sound('half_cs_2.mp3', Sound.MAIN_BUNDLE)];
const tenEn = [new Sound('ten_en_1.mp3', Sound.MAIN_BUNDLE), new Sound('ten_en_2.mp3', Sound.MAIN_BUNDLE)];
const halfEn = [new Sound('half_en_1.mp3', Sound.MAIN_BUNDLE), new Sound('half_en_2.mp3', Sound.MAIN_BUNDLE)];
const refereeWhistle = new Sound('referee_whistle.mp3', Sound.MAIN_BUNDLE);

export function playTik() {
  tik.play();
}

export function playTak() {
  tak.play();
}

export function playTen(lang: Lang) {
  if (lang === 'cs') {
    Math.random() > 0.5 ? tenCs[0].play() : tenCs[1].play();
  } else {
    Math.random() > 0.5 ? tenEn[0].play() : tenEn[1].play();
  }
}

export function playHalf(lang: Lang) {
  if (lang === 'cs') {
    Math.random() > 0.5 ? halfCs[0].play() : halfCs[1].play();
  } else {
    Math.random() > 0.5 ? halfEn[0].play() : halfEn[1].play();
  }
}

export function playRefereeWhistle() {
  refereeWhistle.play();
}
