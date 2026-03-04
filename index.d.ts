export interface Options {
	reviver?: (key: string, value: unknown) => unknown;
	relaxed?: boolean;
	warnings?: boolean;
	tolerant?: boolean;
	duplicate?: boolean;
}

export interface RJSON {
	/**
	 * Transforms Relaxed JSON text into JSON text.
	 * Doesn't verify (parse) the JSON, i.e., result JSON might be invalid as well.
	 */
	transform(text: string): string;
	/**
	 * Parse the RJSON text, virtually `JSON.parse(JSON.transform(text), reviver)`.
	 * You could pass a reviver function or an options object as the second argument.
	 */
	parse(text: string, reviver?: (key: string, value: unknown) => unknown): unknown;
	parse(text: string, opts?: Options): unknown;
	/**
	 * Stringify an object to JSON string.
	 */
	stringify(obj: unknown): string;
}

declare const RJSON: RJSON;

export default RJSON;
