import createRuntimeGlueCode from "../createRuntimeGlueCode.mjs"

export default async function(runtime_data, use_static_runtime) {
	let virtual_module = ``

	virtual_module  = `const runtime_data = ` + JSON.stringify(runtime_data, null, 4) + ";\n"
	virtual_module += `import {initializeRuntimeFromData} from "@4tune-poc/js-runtime"\n`
	virtual_module += `const runtime = initializeRuntimeFromData(runtime_data);\n`

	virtual_module += createRuntimeGlueCode(use_static_runtime, "runtime")

	return virtual_module
}
