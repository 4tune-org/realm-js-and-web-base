import generateRuntimeInitData from "../generateRuntimeInitData.mjs"
import generateProjectResources from "../generateProjectResources.mjs"

import pluginResolveIdFactory from "./pluginResolveIdFactory.mjs"
import pluginLoadFactory from "./pluginLoadFactory.mjs"

export default async function(project_root) {
	const runtime_init_data = await generateRuntimeInitData(project_root)
	const project_resources = await generateProjectResources(project_root, null)

	const ctx = {
		runtime_init_data,
		project_resources
	}

	const resolveId = await pluginResolveIdFactory()
	const load = await pluginLoadFactory(ctx, true)

	return function fortuneStaticRuntimePlugin() {
		return {
			name: "rollup-plugin-fortune-static-runtime",
			resolveId,
			load
		}
	}
}
