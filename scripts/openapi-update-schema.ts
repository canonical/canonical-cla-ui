import { $ } from 'bun';
import { dirname } from 'path';

const CANONICAL_CLA_API_URL = process.env.CANONICAL_CLA_API_URL || 'https://cla.canonical.com';
const output = '.api-spec/cla.json' as const;
const spec_url = `${CANONICAL_CLA_API_URL}/openapi.json`;

await $`mkdir -p ${dirname(output)}`;

await $`echo "Using API URL: ${spec_url}"`;
await $`curl -fsSL ${spec_url} -o ${output}`;
await $`echo "Saved ${output}"`;
