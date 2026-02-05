import { claApi } from '$lib';
import { GITHUB_COOKIE, LAUNCHPAD_COOKIE, OIDC_COOKIE } from '$lib/cookies';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const githubCookie = event.cookies.get(GITHUB_COOKIE);
	const launchpadCookie = event.cookies.get(LAUNCHPAD_COOKIE);
	const oidcCookie = event.cookies.get(OIDC_COOKIE);

	let githubProfile = null;
	let launchpadProfile = null;
	let oidcProfile = null;
	if (githubCookie) {
		const githubProfileResponse = await claApi.GET('/github/profile', {
			headers: {
				Cookie: `${GITHUB_COOKIE}=${githubCookie}`
			}
		});
		if (githubProfileResponse.data) {
			githubProfile = githubProfileResponse.data;
		}
	}
	if (launchpadCookie) {
		const launchpadProfileResponse = await claApi.GET('/launchpad/profile', {
			headers: {
				Cookie: `${LAUNCHPAD_COOKIE}=${launchpadCookie}`
			}
		});
		if (launchpadProfileResponse.data) {
			launchpadProfile = launchpadProfileResponse.data;
		}
	}

	const oidcProfileResponse = await claApi.GET('/oidc/profile', {
		headers: {
			Cookie: `${OIDC_COOKIE}=${oidcCookie}`
		}
	});
	if (oidcProfileResponse.data) {
		oidcProfile = oidcProfileResponse.data;
	}
	if (oidcCookie) {
		const oidcProfileResponse = await claApi.GET('/oidc/profile', {
			headers: {
				Cookie: `${OIDC_COOKIE}=${oidcCookie}`
			}
		});
		if (oidcProfileResponse.data) {
			oidcProfile = oidcProfileResponse.data;
		}
	}
	return {
		oidcProfile: oidcProfile,
		githubProfile: githubProfile,
		launchpadProfile: launchpadProfile
	};
};
