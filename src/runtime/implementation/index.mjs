export function initializeRuntimeFromData(runtime_data) {
	return {
		loadProjectPackageJSON() {
			return JSON.parse(JSON.stringify(runtime_data.package_json))
		},

		loadResource(url) {
			console.log("load resource", runtime_data.resources)
		}
	}
}
