// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createDebounce<T extends (...args: any) => any>(callback: T, delay: number = 300) {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return (...args: Parameters<T>) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => callback(...args), delay);
	};
}
