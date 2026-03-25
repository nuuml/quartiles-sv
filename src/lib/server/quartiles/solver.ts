import type { QuartilesSolutionBuckets } from '$lib/features/quartiles/types';
import { getDictionary, hasPrefix, isDictionaryWord } from '$lib/server/quartiles/dictionary';

export const MAX_PARTS = 20;

export const normalizeParts = (parts: string[]) =>
	parts.map((part) => part.trim().toLowerCase()).filter((part) => part.length > 0);

export const solveQuartiles = async (parts: string[]) => {
	const dictionary = await getDictionary();
	const output = {
		one: new Set<string>(),
		two: new Set<string>(),
		three: new Set<string>(),
		four: new Set<string>()
	};

	for (let i = 0; i < parts.length; i++) {
		const first = parts[i];
		if (!hasPrefix(dictionary, first)) {
			continue;
		}
		if (isDictionaryWord(dictionary, first)) {
			output.one.add(first);
		}

		for (let j = 0; j < parts.length; j++) {
			if (i === j) {
				continue;
			}
			const second = `${first}${parts[j]}`;
			if (!hasPrefix(dictionary, second)) {
				continue;
			}
			if (isDictionaryWord(dictionary, second)) {
				output.two.add(second);
			}

			for (let k = 0; k < parts.length; k++) {
				if (k === i || k === j) {
					continue;
				}
				const third = `${second}${parts[k]}`;
				if (!hasPrefix(dictionary, third)) {
					continue;
				}
				if (isDictionaryWord(dictionary, third)) {
					output.three.add(third);
				}

				for (let l = 0; l < parts.length; l++) {
					if (l === i || l === j || l === k) {
						continue;
					}
					const fourth = `${third}${parts[l]}`;
					if (isDictionaryWord(dictionary, fourth)) {
						output.four.add(fourth);
					}
				}
			}
		}
	}

	const solution: QuartilesSolutionBuckets = {
		one: Array.from(output.one),
		two: Array.from(output.two),
		three: Array.from(output.three),
		four: Array.from(output.four)
	};
	const count =
		solution.one.length + solution.two.length + solution.three.length + solution.four.length;

	return { solution, count };
};
