
export type ObjectType = Record<string, any>

export type Nullable<T> = T | null


// Positive number range
type CreateArrayWithLengthX<LENGTH extends number, ACC extends unknown[] = []> = 
  ACC['length'] extends LENGTH ? ACC : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>

type NumericNumberRange<START_ARR extends number[], END extends number, ACC extends number = never> = 
  START_ARR['length'] extends END ? ACC | END : NumericNumberRange<[...START_ARR, 1], END, ACC | START_ARR['length']>

export type PositiveNumberRange<MAX extends number> = NumericNumberRange<CreateArrayWithLengthX<1>, MAX>


/*
JavaScript converts numbers to strings when indexing an object:
[..] when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.

Example:
let abc: AbstractModel = {
    1: "one",
};
console.log(abc[1] === abc["1"]); // true

When you only want the string keys, then you could only extract the string keys from your interface like so:
*/
export type StringKey<T> = Extract<keyof T, string>
