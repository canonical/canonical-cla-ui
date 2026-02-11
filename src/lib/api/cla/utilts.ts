import type { components } from './types';

export const extractErrorMessage = <
	T extends {
		detail?: components['schemas']['ValidationError'][];
	}
>(
	error: T
) => {
	return Array.isArray(error.detail)
		? error.detail.map((e) => e.msg).join(', ')
		: error.detail || 'An unknown error occurred';
};
