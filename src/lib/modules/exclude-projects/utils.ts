import { ProjectPlatform } from '$lib/api/cla/types';

export function projectPlatformLabel(platform: ProjectPlatform) {
	return (
		{
			[ProjectPlatform.github]: 'GitHub',
			[ProjectPlatform.launchpad]: 'Launchpad'
		}[platform] || platform
	);
}
