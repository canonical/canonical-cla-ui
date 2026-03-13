import * as v from 'valibot';
import { ProjectPlatform } from '$lib/api';

export const excludeProjectCreateSchema = v.object({
	platform: v.enum(ProjectPlatform),
	full_name: v.pipe(v.string(), v.trim(), v.nonEmpty("Project name can't be empty")),
	reason: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty("Reason can't be empty"),
		v.maxLength(500, "Reason can't exceed 500 characters")
	)
});

export const excludeProjectDeleteSchema = v.object({
	platform: v.enum(ProjectPlatform),
	full_name: v.pipe(v.string(), v.trim(), v.nonEmpty("Project name can't be empty"))
});
