import type { ObjectType } from "../src/common";



const sleep = async (ms: number): Promise<NodeJS.Timeout> => {
	return new Promise(resolve => setTimeout(resolve, ms))
}


const sortObjectFields = (obj: ObjectType): ObjectType => {
	const sorted = Object.keys(obj).sort().reduce((accumulator: ObjectType, key: string) => {
		accumulator[key] = obj[key];
		return accumulator;
	}, {})
	return sorted
}


export { sleep, sortObjectFields }
