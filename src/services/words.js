/**
 * @format
 * @flow
 */

import adjectives from '../lists/adjectives';
import genres from '../lists/genres';
import nouns from '../lists/nouns';
import places from '../lists/places';

export function getCountAdjectives(): number {
  return adjectives.length;
}

export function getCountGenres(): number {
  return genres.length;
}

export function getCountNouns(): number {
  return nouns.length;
}

export function getCountPlaces(): number {
  return places.length;
}

export function getRandomAdjective(): string {
  return getRandom(adjectives);
}

export function getRandomNoun(): string {
  return getRandom(nouns);
}

export function getRandomPlace(): string {
  return getRandom(places);
}

export function getRandomGenre(): string {
  return getRandom(genres);
}

function getRandom(array: string[]): string {
  const count = array.length;
  const index = Math.floor(Math.random() * count);
  return array[index];
}
