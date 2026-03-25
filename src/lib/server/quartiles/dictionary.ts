import { fileURLToPath } from 'node:url';

import Dictionary from 'en-dictionary';

const WORDNET_DB_PATH = fileURLToPath(
	new URL('../../../../node_modules/en-wordnet/database/3.1', import.meta.url)
);

let dictionaryPromise: Promise<Dictionary> | undefined;

export const getDictionary = () => {
	if (!dictionaryPromise) {
		const dictionary = new Dictionary(WORDNET_DB_PATH);
		dictionaryPromise = dictionary.init().then(() => dictionary);
	}

	return dictionaryPromise;
};

export const hasPrefix = (dictionary: Dictionary, prefix: string) =>
	dictionary.wordsStartingWith(prefix).length > 0;

export const isDictionaryWord = (dictionary: Dictionary, candidate: string) =>
	dictionary.searchSimpleFor([candidate]).has(candidate);
