import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const claOidcAuth: Handle = async ({ event, resolve }) => {
	// const oidcCookie = event.cookies.get('canonical_oidc_session');
	// TODO: Implement OIDC authentication
	return await resolve(event);
};

export const handle: Handle = sequence(claApiRedirect, claOidcAuth);
