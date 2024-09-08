export default function(use_static_runtime, runtime_var_name) {
	let glue_code = ""

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
		glue_code += `export function ${method}(...args) { return ${runtime_var_name}.${method}(...args); }\n`
	}

	glue_code += `export default ${runtime_var_name};\n`

	return glue_code
}
