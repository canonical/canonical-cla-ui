// See https://svelte.dev/docs/kit/types#app.d.ts

import type { OidcProfile } from '$lib';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			oidcProfile?: OidcProfile;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
