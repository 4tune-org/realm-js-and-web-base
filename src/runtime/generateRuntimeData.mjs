import generateProjectResources from "./generateProjectResources.mjs"

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
	const resources = await generateProjectResources(project_root, rollup_plugin)

	return {
		resources
	}
}
