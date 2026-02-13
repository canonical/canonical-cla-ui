import { claApi } from '$lib';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
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

	// locals.oidcProfile is set if the user is visiting a page that requires authentication, so we don't need to fetch the profile again
	// otherwise, we fetch the profile from the API as it is needed as optional data for the page
	const oidcProfileResponse = () => {
		if (locals.oidcProfile) {
			return { data: locals.oidcProfile, error: undefined };
		}
		return claApi.GET('/oidc/profile', {
			headers: {
				Cookie: `canonical_oidc_session="${cookies.get('canonical_oidc_session')}"`
			}
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
