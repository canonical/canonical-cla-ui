import { form, getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { claApi } from '$lib/api';
import { error } from '@sveltejs/kit';
import { excludeProjectSchema } from './schema';

export const excludeProject = form(excludeProjectSchema, async (project) => {
	const event = getRequestEvent();
	const response = await claApi.POST('/cla/exclude-project', {
		fetch: event?.fetch,
		body: project,
		params: {
			header: {
				'X-Internal-Secret': env.CLA_INTERNAL_API_SECRET
			}
		}
	});
	if (response.error) {
		const errorMessage = Array.isArray(response.error.detail)
			? response.error.detail.map((e) => e.msg).join(', ')
			: response.error.detail || 'An unknown error occurred';
		error(response.response.status, errorMessage);
	}
	return response.data;
});

export const unExcludeProject = form(excludeProjectSchema, async (project) => {
	const event = getRequestEvent();
	const response = await claApi.DELETE('/cla/excluded-project', {
		fetch: event?.fetch,
		body: project,
		params: {
			header: {
				'X-Internal-Secret': env.CLA_INTERNAL_API_SECRET
			}
		}
	});
	if (response.error) {
		const errorMessage = Array.isArray(response.error.detail)
			? response.error.detail.map((e) => e.msg).join(', ')
			: response.error.detail || 'An unknown error occurred';
		error(response.response.status, errorMessage);
	}
	return response.data;
});
