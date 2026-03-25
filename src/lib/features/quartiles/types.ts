export type SolveRequestBody = {
	parts: string[];
};

export type QuartilesSolutionBuckets = {
	one: string[];
	two: string[];
	three: string[];
	four: string[];
};

export type SolveResponseSuccess = {
	solution: QuartilesSolutionBuckets;
	count: number;
};

export type SolveResponseError = {
	error: string;
};
