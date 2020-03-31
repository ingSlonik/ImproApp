/**
 * @format
 * @flow
 */

import type {Lang} from '../services/language';

import adjectivesCs from '../dictionaries/adjectivesCs';
import genresCs from '../dictionaries/genresCs';
import nounsCs from '../dictionaries/nounsCs';
import placesCs from '../dictionaries/placesCs';

import adjectivesEn from '../dictionaries/adjectivesEn';
import genresEn from '../dictionaries/genresEn';
import nounsEn from '../dictionaries/nounsEn';
import placesEn from '../dictionaries/placesEn';

export function getCountAdjectives(lang: Lang): number {
  const adjectives = lang === 'cs' ? adjectivesCs : adjectivesEn;
  return adjectives.length;
}

export function getCountGenres(lang: Lang): number {
  const genres = lang === 'cs' ? genresCs : genresEn;
  return genres.length;
}

export function getCountNouns(lang: Lang): number {
  const nouns = lang === 'cs' ? nounsCs : nounsEn;
  return nouns.length;
}

export function getCountPlaces(lang: Lang): number {
  const places = lang === 'cs' ? placesCs : placesEn;
  return places.length;
}

export function getRandomAdjective(lang: Lang): string {
  const adjectives = lang === 'cs' ? adjectivesCs : adjectivesEn;
  return getRandom(adjectives);
}

export function getRandomNoun(lang: Lang): string {
  const nouns = lang === 'cs' ? nounsCs : nounsEn;
  return getRandom(nouns);
}

export function getRandomPlace(lang: Lang): string {
  const places = lang === 'cs' ? placesCs : placesEn;
  return getRandom(places);
}

export function getRandomGenre(lang: Lang): string {
  const genres = lang === 'cs' ? genresCs : genresEn;
  return getRandom(genres);
}

function getRandom(array: string[]): string {
  const count = array.length;
  const index = Math.floor(Math.random() * count);
  return array[index];
}
