/**
 * Inspired by inflector-js --> https://github.com/didanurwanda/inflector-js 
 */


const _Inflector = {

	uncountableWords: [
		'equipment', 'information', 'rice', 'money', 'species', 'series',
		'fish', 'sheep', 'moose', 'deer', 'news'
	],

	pluralRules: [
		[/(m)an$/gi, '$1en'],
		[/(pe)rson$/gi, '$1ople'],
		[/(child)$/gi, '$1ren'],
		[/^(ox)$/gi, '$1en'],
		[/(ax|test)is$/gi, '$1es'],
		[/(octop|vir)us$/gi, '$1i'],
		[/(alias|status)$/gi, '$1es'],
		[/(bu)s$/gi, '$1ses'],
		[/(buffal|tomat|potat)o$/gi, '$1oes'],
		[/([ti])um$/gi, '$1a'],
		[/sis$/gi, 'ses'],
		[/(?:([^f])fe|([lr])f)$/gi, '$1$2ves'],
		[/(hive)$/gi, '$1s'],
		[/([^aeiouy]|qu)y$/gi, '$1ies'],
		[/(x|ch|ss|sh)$/gi, '$1es'],
		[/(matr|vert|ind)ix|ex$/gi, '$1ices'],
		[/([m|l])ouse$/gi, '$1ice'],
		[/(quiz)$/gi, '$1zes'],
		[/s$/gi, 's'],
		[/$/gi, 's']
	],

	singularRules: [
		[/(m)en$/gi, '$1an'],
		[/(pe)ople$/gi, '$1rson'],
		[/(child)ren$/gi, '$1'],
		[/([ti])a$/gi, '$1um'],
		[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, '$1$2sis'],
		[/(hive)s$/gi, '$1'],
		[/(tive)s$/gi, '$1'],
		[/(curve)s$/gi, '$1'],
		[/([lr])ves$/gi, '$1f'],
		[/([^fo])ves$/gi, '$1fe'],
		[/([^aeiouy]|qu)ies$/gi, '$1y'],
		[/(s)eries$/gi, '$1eries'],
		[/(m)ovies$/gi, '$1ovie'],
		[/(x|ch|ss|sh)es$/gi, '$1'],
		[/([m|l])ice$/gi, '$1ouse'],
		[/(bus)es$/gi, '$1'],
		[/(o)es$/gi, '$1'],
		[/(shoe)s$/gi, '$1'],
		[/(cris|ax|test)es$/gi, '$1is'],
		[/(octop|vir)i$/gi, '$1us'],
		[/(alias|status)es$/gi, '$1'],
		[/^(ox)en/gi, '$1'],
		[/(vert|ind)ices$/gi, '$1ex'],
		[/(matr)ices$/gi, '$1ix'],
		[/(quiz)zes$/gi, '$1'],
		[/s$/gi, '']
	],

	nonTitlecasedWords: [
		'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
		'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
		'with', 'for'
	],

	idSuffix: /(_ids|_id)$/g,
	underbar: /_/g,
	spaceOrUnderbar: /[ _]/g,
	uppercase: /([A-Z])/g,
	underbarPrefix: /^_/,

	applyRules: (str: string, rules: Array<Array<string | RegExp>>, skip: string[], override?: string): string => {
		if (override) {
			str = override
		} else {
			const ignore = (skip.includes(str.toLowerCase()))
			if (!ignore) {
				for (let x = 0; x < rules.length; x++) {
					if (str.match(rules[x][0])) {
						str = str.replace(rules[x][0], rules[x][1] as string)
						break;
					}
				}
			}
		}
		return str
	},


	/*
	Inflector.pluralize('person')           -> 'people'
	Inflector.pluralize('octopus')          -> 'octopi'
	Inflector.pluralize('Hat')              -> 'Hats'
	Inflector.pluralize('person', 'guys')   -> 'guys'    
	*/
	pluralize: (str: string, plural?: string): string => {
		return _Inflector.applyRules(
			str,
			_Inflector.pluralRules,
			_Inflector.uncountableWords,
			plural
		)
	},

	/*
	Inflector.singularize('person')         -> 'person'
	Inflector.singularize('octopi')         -> 'octopus'
	Inflector.singularize('hats')           -> 'hat'
	Inflector.singularize('guys', 'person') -> 'person'
	*/
	singularize: (str: string, singular?: string): string => {
		return _Inflector.applyRules(
			str,
			_Inflector.singularRules,
			_Inflector.uncountableWords,
			singular
		)
	},

	/*
	Inflector.camelize('message_properties')        -> 'MessageProperties'
	Inflector.camelize('message_properties', true)  -> 'messageProperties'
	*/
	camelize: (str: string, lowFirstLetter?: boolean): string => {
		// str = str.toLowerCase()
		const strPath = str.split('/')
		for (let i = 0; i < strPath.length; i++) {
			const strArr = strPath[i].split('_')
			const initX = ((lowFirstLetter && i + 1 === strPath.length) ? (1) : (0))
			for (let x = initX; x < strArr.length; x++) {
				strArr[x] = strArr[x].charAt(0).toUpperCase() + strArr[x].substring(1)
			}
			strPath[i] = strArr.join('')
		}
		str = strPath.join('::')

		// fix 
		if (lowFirstLetter) {
			const first = str.charAt(0).toLowerCase()
			const last = str.slice(1)
			str = first + last
		}
		return str
	},

	/*
	Inflector.underscore('MessageProperties')       -> 'message_properties'
	Inflector.underscore('messageProperties')       -> 'message_properties'
	*/
	underscore: (str: string): string => {
		const strPath = str.split('::')
		for (let i = 0; i < strPath.length; i++) {
			strPath[i] = strPath[i].replace(_Inflector.uppercase, '_$1')
			strPath[i] = strPath[i].replace(_Inflector.underbarPrefix, '')
		}
		str = strPath.join('/').toLowerCase()
		return str
	},
  snakeCase: (str: string): string => {
    return _Inflector.underscore(str)
  },

	/*
	Inflector.humanize('message_properties')        -> 'Message properties'
	Inflector.humanize('message_properties')        -> 'message properties'
	*/
	humanize: (str: string, lowFirstLetter: boolean): string => {
		str = str.toLowerCase()
		str = str.replace(_Inflector.idSuffix, '')
		str = str.replace(_Inflector.underbar, ' ')
		if (!lowFirstLetter) {
			str = _Inflector.capitalize(str)
		}
		return str
	},

	/*
	Inflector.capitalize('message_properties')      -> 'Message_properties'
	Inflector.capitalize('message properties')      -> 'Message properties'
	*/
	capitalize: (str: string): string => {
		str = str.toLowerCase()
		str = str.substring(0, 1).toUpperCase() + str.substring(1)
		return str
	},

	/*
	Inflector.dasherize('message_properties')       -> 'message-properties'
	Inflector.dasherize('message properties')       -> 'message-properties'
	*/
	dasherize: (str: string): string => {
    str = str.toLocaleLowerCase()
		str = str.replace(_Inflector.spaceOrUnderbar, '-')
		return str
	},
  kebabCase: (str: string): string => {
    return _Inflector.dasherize(str)
  },

	/*
	Inflector.camel2words('message_properties')         -> 'Message Properties'
	Inflector.camel2words('message properties')         -> 'Message Properties'
	Inflactor.camel2words('Message_propertyId', true)   -> 'Message Properties Id'
	*/
	camel2words: (str: string, allFirstUpper: boolean): string => {
		// str = str.toLowerCase()
		if (allFirstUpper) {
			str = _Inflector.camelize(str)
			str = _Inflector.underscore(str)
		} else {
			str = str.toLowerCase()
		}

		str = str.replace(_Inflector.underbar, ' ')
		const strArr = str.split(' ')
		for (let x = 0; x < strArr.length; x++) {
			const d = strArr[x].split('-')
			for (let i = 0; i < d.length; i++) {
				if (!_Inflector.nonTitlecasedWords.includes(d[i].toLowerCase())) {
					d[i] = _Inflector.capitalize(d[i])
				}
			}
			strArr[x] = d.join('-')
		}
		str = strArr.join(' ')
		str = str.substring(0, 1).toUpperCase() + str.substring(1)
		return str
	},

	/*
	Inflector.demodulize('Message::Bus::Properties')    -> 'Properties'
	*/
	demodulize: (str: string): string => {
		const strArr = str.split('::')
		str = strArr[strArr.length - 1]
		return str
	},

	/*
	Inflector.tableize('MessageBusProperty')    -> 'message_bus_properties'
	*/
	tableize: (str: string): string => {
		str = _Inflector.pluralize(_Inflector.underscore(str))
		return str
	},

	/*
	Inflector.classify('message_bus_properties')    -> 'MessageBusProperty'
	*/
	classify: (str: string): string => {
		str = _Inflector.singularize(_Inflector.camelize(str))
		return str
	},

	/*
	Inflector.foreignKey('MessageBusProperty')       -> 'message_bus_property_id'
	Inflector.foreignKey('MessageBusProperty', true) -> 'message_bus_propertyid'
	*/
	foreignKey: (str: string, dropIdUbar: boolean) => {
		str = _Inflector.underscore(_Inflector.demodulize(str)) + (dropIdUbar ? ('') : ('_')) + 'id'
		return str
	},

	/*
	Inflector.ordinalize('the 1 pitch')     -> 'the 1st pitch'
	*/
	ordinalize: (str: string): string => {
		const strArr = str.split(' ')
		for (let x = 0; x < strArr.length; x++) {
			const i = parseInt(strArr[x])
			if (Number.isNaN(i)) {
				const ltd = strArr[x].substring(strArr[x].length - 2)
				const ld = strArr[x].substring(strArr[x].length - 1)
				let suf = "th";
				if ((ltd !== "11") && (ltd !== "12") && (ltd !== "13")) {
					if (ld === "1") suf = "st"
					else if (ld === "2") suf = "nd"
					else if (ld === "3") suf = "rd"
				}
				strArr[x] += suf
			}
		}
		str = strArr.join(' ')
		return str
	}
}



export default _Inflector
