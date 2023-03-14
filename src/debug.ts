
type Debugger = (pattern: string, ...args: any[]) => void

type DebuggerFactory = (namespace: string) => Debugger


/* Nope debugger */
const debuggerFunction = (_pattern: string, ..._args: any[]): void => {
	// console.log(_pattern)
}

let debuggerFactory: DebuggerFactory = (_namespace: string): Debugger => debuggerFunction


/* Try loading 'debug' module */
try {
	const debugModule = require('debug')
	if (debugModule && (typeof debugModule === 'function')) debuggerFactory = debugModule
} catch (error) {
	//
}


const debugPrefix = 'clsdk'


/* Retrieve the name of the caller 'module' */
/*
const caller = (): string => {

	const err = new Error()

	Error.prepareStackTrace = (_, stack) => stack
	const stack = err.stack as unknown as NodeJS.CallSite[]
	Error.prepareStackTrace = undefined

	const fileName = stack[2].getFileName() || '/'

	return fileName.replace(/^.*[\\/]/, '').replace('.ts', '')

}
*/


/* Return a debugger for the defined namespace */
const debug = (namespace: string): Debugger => {
	return debuggerFactory(`${debugPrefix}:${namespace}`)
}


export default debug
