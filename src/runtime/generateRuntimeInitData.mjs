import path from "node:path"
import fs from "node:fs/promises"
import readJSONFile from "../util/readJSONFile.mjs"
import {createRequire} from "node:module"

async function loadFortuneConfig(project_root) {
	const fortune_config_path = path.join(project_root, "fortune.config.mjs")
	const {default: fortune_config} = await import(fortune_config_path)
	let resolved_config = fortune_config

	if (typeof fortune_config === "function") {
		resolved_config = await fortune_config()
	}

	return resolved_config
}

async function loadPackageJSON(project_root) {
	const require = createRequire(
		path.join(project_root, "index.js")
	)

	return await readJSONFile(
		require.resolve("@4tune-poc/realm-js-and-web-base/package.json")
	)
}

//
// Generates the runtime init data needed.
// This includes:
//
//    - The project's package.json contents (retrievable via loadProjectPackageJSON)
//
export default async function(project_root) {
	const package_json = await loadPackageJSON(project_root)

	const project_package_json = await readJSONFile(
		path.join(project_root, "package.json")
	)

	return {
		runtime_version: package_json.version,
		package_json: project_package_json,
		fortune_config: await loadFortuneConfig(project_root)
	}
}
