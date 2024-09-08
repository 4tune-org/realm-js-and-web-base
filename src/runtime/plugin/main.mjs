import generateRuntimeInitData from "../generateRuntimeInitData.mjs"

import pluginResolveIdFactory from "./pluginResolveIdFactory.mjs"
import pluginLoadFactory from "./pluginLoadFactory.mjs"

import resourcesPlugin from "./resources.mjs"

export default async function(project_root) {
	const resources_rollup_plugin = await resourcesPlugin(project_root)

	const runtime_init_data = await generateRuntimeInitData(
		project_root, resources_rollup_plugin
	)

	const ctx = {
		runtime_init_data
	}

	const resolveId = await pluginResolveIdFactory()
	const load = await pluginLoadFactory(ctx, false)

	return function fortuneRuntimePlugin() {
		return {
			name: "rollup-plugin-fortune-runtime",
			resolveId,
			load
		}
	}
}
