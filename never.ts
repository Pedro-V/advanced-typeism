// It's ignored in unions, and dominates in intersections:
type NeverIntersection = never & string;
type NeverUnion = never | string;

// Never and conditional types.
// Since never is ignored in unions, this enables filtering with conditional types.
// Those that must be filtered according to some logical condition are set to never.
// This also works because conditional types distribute over unions.
type OnlyStrings<T> = T extends string ? T : never;
type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>;
// Getting only the first parameter:
type FirstParam<T extends Function> = T extends (arg: infer Arg) => any ? Arg : never;
type GetsString = FirstParam<(arg0: string) => void>;

// Never and mapped types.
type FilterKeys<T, U> = {
    // For each member, apply a condition. If false, set to never.
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T]; // Asking for the members of the type produces a union, filtering never.

type FilterProperties<T, U> = {
    // Get only keys that extends U.
    [K in FilterKeys<T, U>]: T[K];
};

interface AllEventData {
    participants: string[];
    location: string;
    name: string;
    year: number;
}
type OnlyStringEventData = FilterProperties<AllEventData, string>;
