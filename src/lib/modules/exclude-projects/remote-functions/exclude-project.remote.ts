import { form, getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { claApi, extractErrorMessage } from '$lib/api';
import { error } from '@sveltejs/kit';
import { excludeProjectSchema } from './schema';

export const excludeProject = form(excludeProjectSchema, async (project) => {
	const { fetch } = getRequestEvent();
	const response = await claApi.POST('/cla/exclude-project', {
		fetch,
		body: project,
		params: {
			header: {
				'X-Internal-Secret': env.APP_CLA_INTERNAL_API_SECRET
			}
		}
	});
	if (response.error) {
		error(response.response.status, extractErrorMessage(response.error));
	}
	return response.data;
});

export const unExcludeProject = form(excludeProjectSchema, async (project) => {
	const { fetch } = getRequestEvent();
	const response = await claApi.DELETE('/cla/excluded-project', {
		fetch,
		body: project,
		params: {
			header: {
				'X-Internal-Secret': env.APP_CLA_INTERNAL_API_SECRET
			}
		}
	});
	if (response.error) {
		error(response.response.status, extractErrorMessage(response.error));
	}
	return response.data;
});
