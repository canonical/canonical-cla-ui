import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: '/ui'
		},
		experimental: {
			remoteFunctions: true
		},
		env: {
			privatePrefix: 'APP_',
			publicPrefix: 'APP_PUBLIC_'
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;
