import generateRuntimeData from "../generateRuntimeData.mjs"
import buildVirtualModuleCode from "../buildVirtualModuleCode.mjs"

import {fileURLToPath} from "node:url"
import path from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function(project_root) {
	let ctx = {}

	function plugin(use_static_runtime) {
		return {
			name: "rollup-plugin-fortune-runtime",

			resolveId(id) {
				if (
					id === `@4tune-poc/realm-js` ||
					id === `@4tune-poc/realm-web`
				) {
					// this signals that Rollup should not ask other plugins or check
					// the file system to find this id
					return `\0${id}`
				}

				if (id === `@4tune-poc/js-runtime`) {
					return path.join(
						__dirname, "..", "implementation", "index.mjs"
					)
				}

				return null // other ids should be handled as usually
			},

			async load(id) {
				if (!id.startsWith(`\0@4tune-poc/realm-`)) {
					return null
				}

				let runtime_data = ctx.runtime_data

				if (use_static_runtime) {
					runtime_data = ctx.static_runtime_data
				}

				return await buildVirtualModuleCode(
					runtime_data, use_static_runtime
				)
			}
		}
	}

	ctx.plugin = plugin

	// todo: only call "generateRuntimeData" once and
	// do the rest with rollup

	//
	// runtime data for project source files
	//
	ctx.runtime_data = await generateRuntimeData(project_root, ctx.plugin)

	//
	// runtime data for source files that are inside
	// the project's resource folder
	//
	ctx.static_runtime_data = await generateRuntimeData(project_root, null)

	return ctx.plugin
}
