import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const data = await event.parent();
	if (!data.oidcProfile) {
		redirect(302, '/oidc/login?redirect_uri=/manage');
	}
	return {
		oidcProfile: data.oidcProfile
	};
};
