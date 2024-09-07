export function initializeRuntimeFromData(runtime_data) {
	console.log("initializeRuntimeFromData", runtime_data)

	return {
		loadResource() {
			console.log("load resource")
		}
	}
}
