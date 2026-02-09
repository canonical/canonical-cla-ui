import { asset } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { oidcProfile } = await parent();
	if (!oidcProfile) {
		redirect(302, `/oidc/login?redirect_uri=${encodeURIComponent(asset('/manage'))}`);
	}
	return {
		oidcProfile
	};
};
