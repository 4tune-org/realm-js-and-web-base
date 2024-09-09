import path from "node:path"

export default async function(project_root) {
	const fortune_config_path = path.join(project_root, "fortune.config.mjs")
	const {default: fortune_config} = await import(fortune_config_path)
	let resolved_config = fortune_config

	if (typeof fortune_config === "function") {
		resolved_config = await fortune_config()
	}

	return resolved_config
}
