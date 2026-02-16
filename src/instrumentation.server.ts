import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';

Sentry.init({
	dsn: env.APP_PUBLIC_SENTRY_DSN,
	environment: env.APP_PUBLIC_ENV,
	tracesSampleRate: 1.0,
	// Enable logs to be sent to Sentry
	enableLogs: true
	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: import.meta.env.DEV,
});
