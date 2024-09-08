import generateProjectResources from "./generateProjectResources.mjs"
import path from "node:path"
import fs from "node:fs/promises"

async function loadProjectPackageJSON(project_root) {
	const package_json_path = path.join(project_root, "package.json")
	const package_json = (await fs.readFile(package_json_path)).toString()

	return JSON.parse(package_json)
}

//
// Generates the runtime data needed.
// This includes:
//
//    - The project's package.json contents (retrievable via loadProjectPackageJSON)
//    - Project resources located at <project-root>/resources/<type>/
//      where <type> is either "esmodule", "blob" or "text"
//
// Esmodule resources are allowed to import other resources.
// However, they cannot import other esmodule resources.
// Setting the parameter "rollup_plugin" to null makes this function
// not invoke rollup for esmodules.
//
export default async function(project_root, rollup_plugin) {
	const package_json = await loadProjectPackageJSON(project_root)
	const resources = await generateProjectResources(project_root, rollup_plugin)

	return {
		package_json,
		resources
	}
}
