import fs from "node:fs/promises"
import path from "node:path"
import {spawnSync} from "node:child_process"
import {fileURLToPath} from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function installPackage(pkg_path, dependency, version) {
	const child = spawnSync("npm", [
		"install",
		"--prefix",
		pkg_path,
		`${dependency}@${version}`
	])

	if (child.status !== 0) {
		throw new Error(`Failed to npm install ${dependency}@${version}.\n` + child.stderr.toString())
	}
}

async function clean(project_root) {
	let entries = await fs.readdir(path.join(project_root, ".fortune", "v0"))
	let remove = []

	for (const entry of entries) {
		if (!entry.startsWith("build_dependencies.")) continue

		remove.push(entry)
	}

	for (const entry of remove) {
		await fs.rm(path.join(project_root, ".fortune", "v0", entry), {
			recursive: true,
			force: true
		})
	}
}

function getPlatform() {
	return `${process.platform}-${process.arch}`
}

export default async function(project_root, dependencies) {
	const platform = getPlatform()

	await fs.mkdir(path.join(project_root, ".fortune", "v0"), {
		recursive: true
	})

	await clean(project_root)

	const tmpdir = path.join(project_root, ".fortune", "v0", "build_dependencies." + Math.random().toString(32).slice(2))

	await fs.mkdir(tmpdir)

	let index_file = `let dependencies = []\n\n`
	let i = 0

	for (const dependency in dependencies) {
		let [version, code] = dependencies[dependency]

		const pkg_name = dependency.split(`@`).join("").split(`/`).join("-") + ".pkg"
		const pkg_path = path.join(tmpdir, pkg_name)

		await fs.mkdir(pkg_path)

		installPackage(pkg_path, dependency, version)

		await fs.writeFile(
			path.join(pkg_path, "index.mjs"),
			code
		)

		index_file += `import dependency_${i} from "./${pkg_name}/index.mjs"\n`

		index_file += `dependencies.push({\n`
		index_file += `    name: ${JSON.stringify(dependency)},\n`
		index_file += `    module: dependency_${i},\n`,
		index_file += `    version: ${JSON.stringify(version)}\n`
		index_file += `})\n`

		++i
	}

	index_file += (await fs.readFile(path.join(__dirname, "load.mjs"))).toString()

	await fs.rm(path.join(project_root, ".fortune", "v0", "build_dependencies"), {
		recursive: true,
		force: true
	})

	await fs.writeFile(path.join(tmpdir, "index.mjs"), index_file)
	await fs.writeFile(path.join(tmpdir, "platform.mjs"), `export default ${JSON.stringify(platform)};\n`)

	await fs.rename(
		tmpdir, path.join(project_root, ".fortune", "v0", "build_dependencies")
	)
}
