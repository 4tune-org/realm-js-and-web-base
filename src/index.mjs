import loadBuildDependencies_impl from "./loadBuildDependencies.mjs"
import searchForConfigFile_impl from "./searchForConfigFile.mjs"
import generateRuntimeInitData_impl from "./runtime/generateRuntimeInitData.mjs"
import generateProjectResources_impl from "./runtime/generateProjectResources.mjs"
import rollupPlugin_impl from "./runtime/plugin/main.mjs"

export const loadBuildDependencies = loadBuildDependencies_impl
export const searchForConfigFile = searchForConfigFile_impl
export const generateRuntimeInitData = generateRuntimeInitData_impl
export const generateProjectResources = generateProjectResources_impl
export const rollupPlugin = rollupPlugin_impl

export default {
	loadBuildDependencies,
	searchForConfigFile,
	generateRuntimeInitData,
	generateProjectResources,
	rollupPlugin
}
