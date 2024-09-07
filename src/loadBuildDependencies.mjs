import path from "node:path"
import fs from "node:fs/promises"

export default async function(project_root) {
	const build_dependencies_path = path.resolve(
		project_root, ".fortune", "v0", "build_dependencies", "index.mjs"
	)

	try {
		const stat = await fs.lstat(build_dependencies_path)

		if (!stat.isFile()) {
			throw new Error()
		}
	} catch (e) {
		throw new Error(
			`Unable to locate build dependencies at '${build_dependencies_path}'.\n` +
			`Project root: ${project_root}.`
		)
	}

	return await import(build_dependencies_path)
}
