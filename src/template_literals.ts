// Template literal types indicate that a string type adheres to a pattern.
// Any string beginning with Hello and followed by a value of type string.
type Greeting = `Hello${string}`;
let matches: Greeting = "Hello, world!";
//let misses: Greeting = "hi";

// Any primitive except symbol can be used in the type interpolation:
type Level = number;
type Color = "blue" | "red";
type LevelAndColor = `${Level}-${Color}`;

let colorOk: LevelAndColor = "1-blue";
//let colorError: LevelAndColor = "4-green";

// Built-in string manipulation types exist:
type FormalGreeting = Capitalize<"hello.">;
type BigGreeting = Uppercase<"hello!">;

// Template literal types can be used anywhere string literal are expected, such as
// keys of mapped types:
type DataKey = "location" | "name" | "year";
type ExistenceChecks = {
    [K in `check${Capitalize<DataKey>}`]: () => boolean;
};

// Remapping mapped type keys with 'as' and template literal types:
interface DataEntry<T> {
    key: T;
    value: string;
}
type DataEntryGetters = {
    [K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
}