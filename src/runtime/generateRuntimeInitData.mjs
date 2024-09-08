import path from "node:path"
import fs from "node:fs/promises"
import readJSONFile from "../util/readJSONFile.mjs"

async function loadFortuneConfig(project_root) {
	const fortune_config_path = path.join(project_root, "fortune.config.mjs")
	const {default: fortune_config} = await import(fortune_config_path)
	let resolved_config = fortune_config

	if (typeof fortune_config === "function") {
		resolved_config = await fortune_config()
	}

	return resolved_config
}

//
// Generates the runtime init data needed.
// This includes:
//
//    - The project's package.json contents (retrievable via loadProjectPackageJSON)
//
export default async function(project_root) {
	const package_json = await readJSONFile(
		path.join(project_root, "package.json")
	)

	return {
		package_json,
		fortune_config: await loadFortuneConfig(project_root)
	}
}
