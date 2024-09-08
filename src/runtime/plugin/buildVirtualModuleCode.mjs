import createRuntimeGlueCode from "../createRuntimeGlueCode.mjs"

export default async function(ctx, use_static_runtime) {
	const {
		runtime_init_data,
		project_resources
	} = ctx

	let virtual_module = ``

	virtual_module  = `const runtime_init_data = ` + JSON.stringify(runtime_init_data, null, 4) + ";\n"
	virtual_module += `import {initializeRuntimeFromData} from "@4tune-poc/js-runtime"\n`
	virtual_module += `const runtime = initializeRuntimeFromData(runtime_init_data);\n`

	const load_resources_fn_name = use_static_runtime ? "loadStaticResource" : "loadResource"

	virtual_module += `
export function ${load_resources_fn_name}(url) {
	if (runtime.resources === null) {
		runtime.resources = ${JSON.stringify(project_resources)};
	}

	return runtime.resources
}
`

	virtual_module += createRuntimeGlueCode(use_static_runtime, "runtime")

	return virtual_module
}
