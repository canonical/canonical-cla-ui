import { getRequestEvent, query } from '$app/server';
import { env } from '$env/dynamic/private';
import { claApi, extractErrorMessage, ProjectPlatform } from '$lib/api';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';

export const getExcludedProjects = query(
	v.object({
		limit: v.number(),
		offset: v.number(),
		query: v.optional(v.string()),
		descending: v.optional(v.boolean()),
		platform: v.optional(v.enum(ProjectPlatform))
	}),
	async (params) => {
		const { fetch } = getRequestEvent();
		const response = await claApi.GET('/cla/list-excluded-projects', {
			fetch,
			params: {
				query: params,
				header: {
					'X-Internal-Secret': env.APP_CLA_INTERNAL_API_SECRET
				}
			}
		});
		if (response.error) {
			error(response.response.status, extractErrorMessage(response.error));
		}
		return response.data;
	}
);
