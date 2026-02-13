import { claApi } from '$lib';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const githubProfileResponse = claApi.GET('/github/profile', {
		headers: {
			Cookie: `github_access_token_session="${cookies.get('github_access_token_session')}"`
		}
	});
	const launchpadProfileResponse = claApi.GET('/launchpad/profile', {
		headers: {
			Cookie: `launchpad_access_token_session="${cookies.get('launchpad_access_token_session')}"`
		}
	});
	const oidcProfileResponse = claApi.GET('/oidc/profile', {
		headers: {
			Cookie: `canonical_oidc_session="${cookies.get('canonical_oidc_session')}"`
		}
	});

	const responses = await Promise.all([
		githubProfileResponse,
		launchpadProfileResponse,
		oidcProfileResponse
	]);

	for (const response of responses) {
		// if error is not an unauthorized error, return reject because something is wrong
		if (response.error && response.response.status !== 401) {
			error(500, {
				message: response.error.detail
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
