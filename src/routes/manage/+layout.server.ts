import { asset } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, request }) => {
	const { oidcProfile } = await parent();
	const requestUrl = new URL(request.url);
	const isSSRDataRequest = requestUrl.pathname.endsWith('/__data.json');
	const searchParams = new URLSearchParams(requestUrl.search);

	if (isSSRDataRequest) {
		searchParams.delete('x-sveltekit-invalidated');
		requestUrl.pathname = requestUrl.pathname.replace('/__data.json', '');
		requestUrl.search = searchParams.toString();
	}

	const requestUri = requestUrl.pathname + requestUrl.search;

	const loginPage = asset('/login');
	if (!oidcProfile) {
		redirect(302, `${loginPage}?redirect_uri=${encodeURIComponent(requestUri)}`);
	}

	return {
		oidcProfile
	};
};
