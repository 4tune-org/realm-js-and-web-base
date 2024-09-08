import buildVirtualModuleCode from "./buildVirtualModuleCode.mjs"

export default function(runtime_init_data, use_static_resources) {
	return async function(id) {
		if (!id.startsWith(`\0@4tune-poc/realm-`)) {
			return null
		}

		return await buildVirtualModuleCode(
			runtime_init_data, use_static_resources
		)
	}
}
