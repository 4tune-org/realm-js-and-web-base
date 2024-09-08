import parseResourceURL from "./parseResourceURL.mjs"

export function initializeRuntime(
	runtime_init_data, project_resources = null
) {
	const runtime = {
		resources: project_resources,

		loadProjectPackageJSON() {
			return JSON.parse(JSON.stringify(runtime_init_data.package_json))
		},

		loadResourceDynamic(url) {
			const {type, path} = parseResourceURL(url)

			for (const resource of runtime.resources) {
				if (resource.type !== type) continue
				if (resource.path !== path) continue

				return resource.data
			}

			throw new Error(`Unable to locate resource ${type}://${path}.`)
		}
	}

	return runtime
}
