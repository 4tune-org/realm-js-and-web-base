export function initializeRuntimeFromInitData(runtime_init_data) {
	return {
		resources: null,

		loadProjectPackageJSON() {
			return JSON.parse(JSON.stringify(runtime_init_data.package_json))
		},

		loadResource(url) {
			console.log("load resource", runtime_init_data.resources)
		}
	}
}
