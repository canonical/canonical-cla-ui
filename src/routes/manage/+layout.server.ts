import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { oidcProfile } = await parent();
	if (!oidcProfile) {
		// this should never happen as the hook should redirect the user to the login page if they are not authenticated
		error(401, 'Unauthorized');
	}
	return {
		oidcProfile
	};
};
