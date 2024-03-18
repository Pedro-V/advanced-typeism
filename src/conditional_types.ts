// The check is always for extends/assignability.
type CheckStringAgainstNumber = string extends number ? true : false;

// Generic conditional types.
type CheckAgainstNumber<T> = T extends number ? true : false;
type CheckLiteralString = CheckAgainstNumber<"parakeet">
type CheckLiteralNumber = CheckAgainstNumber<1891>;
type CheckNumber = CheckAgainstNumber<number>;

// Checking if a type is a function type.
type CallableSetting<T> = T extends () => any ? T : () => T;
type GetNumberSetting = CallableSetting<() => number[]>;
type StringSetting = CallableSetting<string>;

// Conditional types distribute over unions:
type ArrayifyUnlessString<T> = T extends string ? T : T[];
// We get string | number[], not (string | number)[].
type HalfArrayified = ArrayifyUnlessString<string | number>;

// Accessing arbitrary portions of a matched condition, and then creating new types from
// these portions can be done with inferred types.
type ArrayItems<T> = T extends (infer Item)[] ? Item : T;
// Suppose T = string[]. In this case, T extends string[], which would match Item with string.
// Now if T = string[][], then T extends (string[])[], and Item = string[].
{
    // Type: string
    type StringItem = ArrayItems<string>;
    // Type: string
    type StringArrayItem = ArrayItems<string[]>;
    // Type: string[]
    type String2DItem = ArrayItems<string[][]>;
}

// This enables recursive conditional types:
type ArrayItemsRecursive<T> = T extends (infer Item)[] ? ArrayItemsRecursive<Item> : T;
{
    // Type: string
    type StringItem = ArrayItemsRecursive<string>;
    // Type: string
    type StringArrayItem = ArrayItemsRecursive<string[]>;
    // Type: string
    type String2DItem = ArrayItemsRecursive<string[][]>;
}

// Mapped conditional types
type MakeAllMembersFunctions<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : () => T[K];
};
type MemberFunctions = MakeAllMembersFunctions<{
    alreadyFunction: () => string,
    notYetFunction: number,
}>;
