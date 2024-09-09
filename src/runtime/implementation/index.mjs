import parseResourceURL from "./parseResourceURL.mjs"

function loadResourceAsURL(map, path, data) {
	if (map.has(path)) {
		return new Promise(resolve => {
			setTimeout(resolve, 0, map.get(path))
		})
	}

	// todo: actually load the resource as URL ...
}

export function initializeRuntime(
	runtime_init_data, project_resources = null
) {
	const runtime = {
		resources: project_resources,
		resources_url: new Map(),

		getRuntimeVersion() {
			return runtime_init_data.runtime_version
		},

		loadProjectPackageJSON() {
			return JSON.parse(JSON.stringify(runtime_init_data.package_json))
		},

		loadFortuneConfiguration() {
			return JSON.parse(JSON.stringify(runtime_init_data.fortune_config))
		},

		loadResourceDynamic(url, as_url = false) {
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

				if (!as_url) return resource.data

				return loadResourceAsURL(
					runtime.resources_url,
					`${type}://${path}`,
					resource.data
				)
			}

			throw new Error(`Unable to locate resource ${type}://${path}.`)
		},

		createDefaultContext() {
			return {}
		}
	}

	return runtime
}
