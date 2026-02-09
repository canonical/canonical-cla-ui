const timers: Map<symbol, NodeJS.Timeout> = new Map();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createDebounce<T extends (...args: any) => any>(callback: T, delay: number = 300) {
	const symbol = Symbol();
	return (...args: Parameters<T>) => {
		clearTimeout(timers.get(symbol));
		const argsTuple: Parameters<T> = args;
		timers.set(
			symbol,
			setTimeout(() => callback(...argsTuple), delay)
		);
	};
}
