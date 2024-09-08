import generateRuntimeData from "../generateRuntimeData.mjs"

import pluginResolveIdFactory from "./pluginResolveIdFactory.mjs"
import pluginLoadFactory from "./pluginLoadFactory.mjs"

export default async function(project_root) {
	const static_runtime_data = await generateRuntimeData(
		project_root, null
	)

	const resolveId = await pluginResolveIdFactory()
	const load = await pluginLoadFactory(static_runtime_data, true)

	return function fortuneStaticRuntimePlugin() {
		return {
			name: "rollup-plugin-fortune-static-runtime",
			resolveId,
			load
		}
	}
}
