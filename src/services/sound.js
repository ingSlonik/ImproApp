/**
 * @format
 * @flow
 */

import Sound from 'react-native-sound';

const tik = new Sound('tik.mp3');
const tak = new Sound('tak.mp3');
const ten = [new Sound('ten1.mp3'), new Sound('ten2.mp3')];
const half = [new Sound('half1.mp3'), new Sound('half2.mp3')];
const refereeWhistle = new Sound('referee_whistle.mp3');

export function playTik() {
  tik.play();
}

export function playTak() {
  tak.play();
}

export function playTen() {
  Math.random() > 0.5 ? ten[0].play() : ten[1].play();
}

export function playHalf() {
  Math.random() > 0.5 ? half[0].play() : half[1].play();
}

export function playRefereeWhistle() {
  refereeWhistle.play();
}
