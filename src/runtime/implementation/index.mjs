export function initializeRuntimeFromInitData(
	runtime_init_data, project_resources = null
) {
	const runtime = {
		resources: project_resources,

		loadProjectPackageJSON() {
			return JSON.parse(JSON.stringify(runtime_init_data.package_json))
		},

		loadResource(url) {
			console.log("load resource", runtime.resources)
		}
	}

	return runtime
}
