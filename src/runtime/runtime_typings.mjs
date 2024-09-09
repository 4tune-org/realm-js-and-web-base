import {createRequire} from "node:module"
import {fileURLToPath} from "node:url"
import fs from "node:fs/promises"

const __filename = fileURLToPath(import.meta.url)
const require = createRequire(__filename)

const types_path = require.resolve("@4tune-poc/js-and-web-runtime/types")
const types = (await fs.readFile(types_path)).toString()

export default types
