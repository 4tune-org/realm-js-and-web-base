export default async function(runtime_data, use_static_runtime) {
	let virtual_module = ``

	virtual_module  = `const runtime_data = ` + JSON.stringify(runtime_data, null, 4) + ";\n"
	virtual_module += `import {initializeRuntimeFromData} from "@4tune-poc/js-runtime"\n`
	virtual_module += `const runtime = initializeRuntimeFromData(runtime_data);\n`

	let runtime_methods = [
		"getRuntimeVersion",
		"loadStaticResource",
		"loadResource",
		"loadProjectPackageJSON",
		"loadFortuneConfiguration",
		"createDefaultContext"
	]

	if (use_static_runtime) {
		runtime_methods = runtime_methods.filter(method => method !== "loadResource")
	} else {
		runtime_methods = runtime_methods.filter(method => method !== "loadStaticResource")
	}

	for (const method of runtime_methods) {
		virtual_module += `export function ${method}(...args) { return runtime.${method}(...args); }\n`
	}

	return virtual_module
}
