import generateRuntimeInitData from "../generateRuntimeInitData.mjs"

import pluginResolveIdFactory from "./pluginResolveIdFactory.mjs"
import pluginLoadFactory from "./pluginLoadFactory.mjs"

import resourcesPlugin from "./resources.mjs"

export default async function(project_root) {
	const resources_rollup_plugin = await resourcesPlugin(project_root)

	const runtime_data = await generateRuntimeInitData(
		project_root, resources_rollup_plugin
	)

	const resolveId = await pluginResolveIdFactory()
	const load = await pluginLoadFactory(runtime_data, false)

	return function fortuneRuntimePlugin() {
		return {
			name: "rollup-plugin-fortune-runtime",
			resolveId,
			load
		}
	}
}
