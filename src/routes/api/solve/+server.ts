import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SolveRequestBody } from '$lib/features/quartiles/types';
import { MAX_PARTS, normalizeParts, solveQuartiles } from '$lib/server/quartiles/solver';

const emptySolution = {
	one: [],
	two: [],
	three: [],
	four: []
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as SolveRequestBody;
	if (!Array.isArray(body.parts) || body.parts.length % 4 !== 0 || body.parts.length > MAX_PARTS) {
		return json(
			{ error: 'Invalid number of parts. Must be a multiple of 4 and no more than 20.' },
			{ status: 400 }
		);
	}

	const parts = normalizeParts(body.parts);
	if (parts.length === 0) {
		return json({ solution: emptySolution, count: 0 });
	}

	const result = await solveQuartiles(parts);
	return json(result);
};
