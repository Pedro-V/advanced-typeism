type Animals = "alligator" | "baboon" | "cat";

type AnimalCounts = {
    // Since Animals is a union of literal types, we don't need to use keyof.
    // K will be each of the literal types of Animals.
    [K in Animals]: number;
}

// We can make all members nullable, using keyof to take the members of an existing type.
interface BirdVariants {
    dove: string;
    eagle: boolean;
}

type NullableBirdVariants = {
    [K in keyof BirdVariants]: BirdVariants[K] | null;
};

// Adding modifiers:
interface Environmentalist {
    area: string;
    name: string;
}

type ReadonlyEnvironmentalist = {
    readonly [K in keyof Environmentalist]: Environmentalist[K];
};

type OptionalReadonlyEnvironmentalist = {
    [K in keyof ReadonlyEnvironmentalist]?: ReadonlyEnvironmentalist[K];
};

// Removing modifiers. Prepend '-' to the modifier.
interface Conservationist {
    name: string;
    catchphrase?: string;
    readonly born: number;
    readonly died?: number;
}

type WritableConservationist = {
    -readonly [K in keyof Conservationist]: Conservationist[K];
};

type RequiredWritableConservationist = {
    [K in keyof WritableConservationist]-?: WritableConservationist[K];
}

// Generic mapped types: A single kind of mapping to different types.
type MakeReadonly<T> = {
    readonly [K in keyof T]: T[K];
}
// Exactly the same as ReadonlyEnvironmentalist.
type AnotherReadonlyEnviromentalist = MakeReadonly<Environmentalist>;

interface GenusData {
    family: string;
    name: string;
}

type MakeOptional<T> = {
    [K in keyof T]?: T[K];
}

function createGenusData(overrides?: MakeOptional<GenusData>): GenusData {
    return {
        family: "unknown",
        name: "unknown",
        ...overrides,
    };
}
// Many of the functionality provided by generic mapped types are available as built-ins:
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
// Hover over each built-in generic mapped type to see their definition.
type PartialTodo = Partial<Todo>;
type RequiredTodo = Required<PartialTodo>;
type ReadonlyTodo = Readonly<Todo>;
type TodoPreview1 = Pick<Todo, "title" | "completed">;
type TodoPreview2 = Omit<Todo, "description">;
