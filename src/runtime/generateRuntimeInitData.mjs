import generateProjectResources from "./generateProjectResources.mjs"
import path from "node:path"
import fs from "node:fs/promises"

async function loadProjectPackageJSON(project_root) {
	const package_json_path = path.join(project_root, "package.json")
	const package_json = (await fs.readFile(package_json_path)).toString()

	return JSON.parse(package_json)
}

//
// Generates the runtime init data needed.
// This includes:
//
//    - The project's package.json contents (retrievable via loadProjectPackageJSON)
//
export default async function(project_root, rollup_plugin) {
	const package_json = await loadProjectPackageJSON(project_root)
	const resources = await generateProjectResources(project_root, rollup_plugin)

	return {
		package_json,
		resources
	}
}
