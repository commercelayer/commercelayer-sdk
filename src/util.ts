import type { ObjectType } from "../src/types"
// import path from 'node:path'



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

/*
const nestedField = (obj: any, field: string): { key: string, val: any } => {

	let fp = field
	if (fp.endsWith('.')) fp = fp.substring(0, fp.length-1)

  const dots = field.split(".")

	const key = dots[dots.length-1]
	let val = obj
  while (dots.length && (val = val[dots.shift() || '']))
    
	return { key, val }
}
*/

/*
const packageInfo = (fields?: string | string[], options?: any): Record<string, any>  => {
	const pjson = require(path.resolve('./', 'package.json'))
	return fields? (Array.isArray(fields)? fields : [ fields ]).reduce((info: any, field) => {
			const nf = nestedField(pjson, field)
			info[options?.nestedName? nf.key : field] = nf.val
			return info
	  }, {}) : pjson
}
*/


const isTokenExpired = (token: string): boolean => {
	try {
		const tokenData = JSON.parse(atob(token.split('.')[1]))
		return (((tokenData.exp * 1000) - Date.now()) < 0)
	} catch (err: any) {
		return false
	}
}


export { sleep, sortObjectFields, /* packageInfo */ isTokenExpired }
