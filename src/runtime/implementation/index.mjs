import parseResourceURL from "./parseResourceURL.mjs"

export function initializeRuntime(
	runtime_init_data, project_resources = null
) {
	const runtime = {
		resources: project_resources,

		getRuntimeVersion() {
			return `0.0.0`
		},

		loadProjectPackageJSON() {
			return JSON.parse(JSON.stringify(runtime_init_data.package_json))
		},

		loadFortuneConfiguration() {
			return JSON.parse(JSON.stringify(runtime_init_data.fortune_config))
		},

		loadResourceDynamic(url) {
			if (url === null) return

			if (runtime.resources === null) {
				throw new Error(
					`Runtime resources have not been loaded yet.\n` +
					`In order to load them import {loadResource} from "@4tune-poc/realm-js" and call loadResource(null)` +
					` to load resources.`
				)
			}

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
