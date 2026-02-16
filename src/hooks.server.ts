import { asset } from '$app/paths';
import { claApi } from '$lib';
import * as Sentry from '@sentry/sveltekit';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleManageLoginRedirect: Handle = async ({ event, resolve }) => {
	const isManageSubPath = event.url.pathname.startsWith('/ui/manage');
	if (isManageSubPath) {
		const oidcProfileResponse = await claApi.GET('/oidc/profile', {
			fetch: event.fetch
		});
		if (oidcProfileResponse.response.status !== 401 && oidcProfileResponse.error) {
			error(500, {
				message: oidcProfileResponse.error.detail || 'An unknown error occurred'
			});
		}

		if (oidcProfileResponse.response.status === 401 || !oidcProfileResponse.data) {
			const loginPage = asset('/login');
			redirect(
				302,
				`${loginPage}?redirect_uri=${encodeURIComponent(event.url.pathname + event.url.search)}`
			);
		}

		event.locals.oidcProfile = oidcProfileResponse.data;
	}

	return resolve(event);
};

export const handle = sequence(Sentry.sentryHandle(), handleManageLoginRedirect);

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = Sentry.handleErrorWithSentry();
