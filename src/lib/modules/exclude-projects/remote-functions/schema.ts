import * as v from 'valibot';
import { ProjectPlatform } from '$lib/api';

export const excludeProjectSchema = v.object({
	platform: v.enum(ProjectPlatform),
	full_name: v.string()
});
