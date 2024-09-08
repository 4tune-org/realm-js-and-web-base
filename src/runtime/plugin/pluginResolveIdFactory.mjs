import {fileURLToPath} from "node:url"
import path from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function() {
	return async function(id) {
		if (
			id === `@4tune-poc/realm-js` ||
			id === `@4tune-poc/realm-web`
		) {
			// this signals that Rollup should not ask other plugins or check
			// the file system to find this id
			return `\0${id}`
		}

		if (id === `@4tune-poc/js-runtime`) {
			return path.join(
				__dirname, "..", "implementation", "index.mjs"
			)
		}

		return null // other ids should be handled as usually
	}
}
