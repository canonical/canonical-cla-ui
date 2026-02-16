import { claApi } from '$lib';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, locals }) => {
	const githubProfileResponse = claApi.GET('/github/profile', {
		fetch
	});
	const launchpadProfileResponse = claApi.GET('/launchpad/profile', {
		fetch
	});

	// locals.oidcProfile is set if the user is visiting a page that requires authentication, so we don't need to fetch the profile again
	// otherwise, we fetch the profile from the API as it is needed as optional data for the page
	const oidcProfileResponse = () => {
		if (locals.oidcProfile) {
			return { data: locals.oidcProfile, error: undefined };
		}
		return claApi.GET('/oidc/profile', {
			fetch
		});
	};

	const responses = await Promise.all([
		githubProfileResponse,
		launchpadProfileResponse,
		oidcProfileResponse()
	]);

	for (const response of responses) {
		// if error is not an unauthorized error, return reject because something is wrong
		if (response.error && response.response.status !== 401) {
			error(response.response.status, {
				message: response.error.detail || 'An unknown error occurred'
			});
		}
	}

	const [githubProfile, launchpadProfile, oidcProfile] = responses;
	return {
		oidcProfile: oidcProfile.data ?? null,
		githubProfile: githubProfile.data ?? null,
		launchpadProfile: launchpadProfile.data ?? null
	};
};
