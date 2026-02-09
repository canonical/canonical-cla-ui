import { claApi } from '$lib';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const githubProfileResponse = await claApi.GET('/github/profile', {
		headers: {
			Cookie: `github_access_token_session="${cookies.get('github_access_token_session')}"`
		}
	});
	const launchpadProfileResponse = await claApi.GET('/launchpad/profile', {
		headers: {
			Cookie: `launchpad_access_token_session="${cookies.get('launchpad_access_token_session')}"`
		}
	});
	const oidcProfileResponse = await claApi.GET('/oidc/profile', {
		headers: {
			Cookie: `canonical_oidc_session="${cookies.get('canonical_oidc_session')}"`
		}
	});
	return {
		oidcProfile: oidcProfileResponse.data ?? null,
		githubProfile: githubProfileResponse.data ?? null,
		launchpadProfile: launchpadProfileResponse.data ?? null
	};
};
