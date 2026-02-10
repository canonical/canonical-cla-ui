import { $ } from 'bun';
import { dirname } from 'path';

const OPENAPI_URL = process.env.OPENAPI_URL || 'https://cla.canonical.com/openapi.json';
const output = '.api-spec/cla.json' as const;
await $`mkdir -p ${dirname(output)}`;

await $`echo "Using API URL: ${OPENAPI_URL}"`;
await $`curl -fsSL ${OPENAPI_URL} -o ${output}`;
await $`echo "Saved ${output}"`;
