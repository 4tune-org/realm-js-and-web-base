
function getPlatform() {
	return `${process.platform}-${process.arch}`
}

const actual_platform = getPlatform()
const expected_platform = (await import("./platform.mjs")).default

if (actual_platform !== expected_platform) {
	throw new Error(
		`Refusing to serve build dependencies that were produced on a different platform.\n` +
		`Expected platform: ${expected_platform}, your platform: ${actual_platform}.\n` +
		`This can be fixed by re-installing @4tune/realm-js or @4tune/realm-web inside your project.`
	)
}

export function getDependency(id) {
	for (const dependency of dependencies) {
		if (dependency.name === id) return dependency.module
	}

	throw new Error(`No such build dependency '${id}'`)
}

export function getVersionOfDependency(id) {
	for (const dependency of dependencies) {
		if (dependency.name === id) return dependency.version
	}

	throw new Error(`No such build dependency '${id}'`)
}

export default dependencies
