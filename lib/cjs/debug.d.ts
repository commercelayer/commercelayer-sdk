declare type Debugger = (pattern: string, ...args: any[]) => void;
declare const debug: (namespace?: string | undefined) => Debugger;
export default debug;
