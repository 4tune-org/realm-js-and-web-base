import path from "node:path"
import readJSONFile from "../util/readJSONFile.mjs"
import loadFortuneConfig from "./loadFortuneConfig.mjs"
import getRuntimeVersionString from "./getRuntimeVersionString.mjs"

//
// Generates the runtime init data needed.
// This includes:
//
//.   - Contents of fortune.config.mjs.
//    - The project's package.json contents (retrievable via loadProjectPackageJSON)
//
export default async function(project_root) {
	const project_package_json = await readJSONFile(
		path.join(project_root, "package.json")
	)

	return {
		runtime_version: await getRuntimeVersionString(project_root),
		package_json: project_package_json,
		fortune_config: await loadFortuneConfig(project_root)
	}
}
