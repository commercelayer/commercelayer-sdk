
const sleep = async (ms: number): Promise<NodeJS.Timeout> => {
	return new Promise(resolve => setTimeout(resolve, ms))
}


export { sleep }
