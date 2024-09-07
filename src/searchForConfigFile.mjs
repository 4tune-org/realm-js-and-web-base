import fs from "node:fs/promises"
import path from "node:path"

export default async function searchForConfigFile(dir, debug_print = false) {
	const entries = await fs.readdir(dir)

	if (debug_print) {
		console.log("searchForConfigFile", dir)
	}

	for (const entry of entries) {
		let absolute_path = path.join(dir, entry)
		const stat = await fs.lstat(absolute_path)

		if (entry === "fortune.config.mjs" && stat.isFile()) {
			return path.dirname(absolute_path)
		}
	}

	if (dir !== "/") {
		return await searchForConfigFile(path.resolve(dir, ".."))
	}

	return false
}
