import path from "node:path"
import readdir from "../util/readdir.mjs"

export default async function(project_root) {
	const entries = await readdir(
		path.join(project_root, "resources")
	)

	return entries.map(({relative_path}) => {
		if (relative_path.startsWith("esmodule/")) {
			return {
				type: "esmodule",
				path: relative_path.slice("esmodule/".length)
			}
		} else if (relative_path.startsWith("blob/")) {
			return {
				type: "blob",
				path: relative_path.slice("blob/".length)
			}
		} else if (relative_path.startsWith("text/")) {
			return {
				type: "text",
				path: relative_path.slice("text/".length)
			}
		}

		return false
	}).filter(entry => entry !== false)
}
