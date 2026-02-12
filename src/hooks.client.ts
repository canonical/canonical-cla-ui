import { env } from '$env/dynamic/public';
import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: env.APP_PUBLIC_SENTRY_DSN,
	environment: env.APP_PUBLIC_ENV,
	tracesSampleRate: 1.0,
	// Enable logs to be sent to Sentry
	enableLogs: true,
	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/sveltekit/configuration/options/#sendDefaultPii
	sendDefaultPii: true
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
