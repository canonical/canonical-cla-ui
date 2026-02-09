import { getRequestEvent, query } from '$app/server';
import { env } from '$env/dynamic/private';
import { claApi, ProjectPlatform } from '$lib/api';
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
		const event = getRequestEvent();
		const response = await claApi.GET('/cla/list-excluded-projects', {
			fetch: event?.fetch,
			params: {
				query: params,
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
	}
);
