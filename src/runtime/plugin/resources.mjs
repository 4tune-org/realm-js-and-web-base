import generateRuntimeInitData from "../generateRuntimeInitData.mjs"

import pluginResolveIdFactory from "./pluginResolveIdFactory.mjs"
import pluginLoadFactory from "./pluginLoadFactory.mjs"

export default async function(project_root) {
	const runtime_init_data = await generateRuntimeInitData(
		project_root, null
	)

	const resolveId = await pluginResolveIdFactory()
	const load = await pluginLoadFactory(runtime_init_data, true)

	return function fortuneStaticRuntimePlugin() {
		return {
			name: "rollup-plugin-fortune-static-runtime",
			resolveId,
			load
		}
	}
}
