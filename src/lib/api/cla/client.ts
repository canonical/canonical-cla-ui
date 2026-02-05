import { env } from '$env/dynamic/private';
import createClient from 'openapi-fetch';
import type { paths } from './types.js';

export const claApi = createClient<paths>({
	baseUrl: env.ORIGIN,
	headers: {
		'X-Internal-Secret': env.CLA_INTERNAL_API_SECRET
	}
});
