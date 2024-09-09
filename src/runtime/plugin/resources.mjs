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

	const resolveId = pluginResolveIdFactory()

	return function fortuneStaticRuntimePlugin({resource_path}) {
		const {fortune_config} = ctx.runtime_init_data.fortune_config

		return {
			name: "rollup-plugin-fortune-static-runtime",
			resolveId,
			async load(id) {
				let load = pluginLoadFactory(ctx, true)

				return await load(id)
			}
		}
	}
}
