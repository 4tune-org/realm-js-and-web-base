import {fileURLToPath} from "node:url"
import path from "node:path"
import runInstall from "./install/run.mjs"
import searchForConfigFile from "./src/searchForConfigFile.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const base_dependencies = {
	"rollup": [
		"4.21.2",
		`import {rollup} from "rollup"\n` +
		`export default rollup`
	],

	"@rollup/plugin-node-resolve": [
		"15.2.3",
		`import plugin from "@rollup/plugin-node-resolve"\n` +
		`export default plugin`
	],

	"rollup-plugin-dts": [
		"6.1.1",
		`import {dts} from "rollup-plugin-dts"\n` +
		`export default dts`
	]
}

export default async function(dependencies = {}) {
	const project_root1 = await searchForConfigFile(__dirname, true)
	//
	// if npm did everything as expected, this module will be located
	// under:
	//
	// <project-root>/node_modules/@4tune/realm-js-and-web-template
	//
	const project_root2 = path.resolve(__dirname, "..", "..", "..")

	console.log("project_root1", project_root1)
	console.log("project_root2", project_root2)

	if (project_root1 === false) {
		throw new Error(
			`Unable to locate fortune.config.mjs.\n` +
			`Make sure this file exists in the project root.`
		)
	}

	const pr1 = path.normalize(project_root1)
	const pr2 = path.normalize(project_root2)

	console.log("pr1", pr1)
	console.log("pr2", pr2)

	if (pr1 !== pr2) {
		throw new Error(
			`Unexpected project root:\n` +
			`Expected project root : ${pr2}\n` +
			`Actual project root   : ${pr1}.`
		)
	}

	await runInstall(project_root1, {
		...base_dependencies,
		...dependencies
	})
}
