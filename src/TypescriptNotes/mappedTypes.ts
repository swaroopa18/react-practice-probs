type Point = {
  x: number;
  y: number;
};

type x = Point["x"]; //number
type PointKeys = keyof Point; // 'x' | 'y'

//1
type ReadOnlyPoint = {
  readonly x: number;
  readonly y: number;
};

//2
type ReadOnlyPoint2 = Readonly<Point>; // { readonly x: number; readonly y: number; }

//3
type ReadOnlyPoint3 = {
  readonly [key in "x" | "y"]: number;
};

//4
type ReadOnlyPoint4 = {
  readonly [key in keyof Point]: Point[key];
};

//5
type ReadOnlyPoint5<T> = {
  readonly [key in keyof T]: T[key];
};

const readOnlyOrigin: ReadOnlyPoint5<Point> = {
  x: 0,
  y: 0,
};

// ------------------------------------------

type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;
type FlattenWOInfer<T> = T extends any[] ? FlattenWOInfer<T[0]> : T;
type NestedArray = Array<Array<number>>; // nested array type
type FlattenArray = Flatten<NestedArray>; // Result: number[]

// ------------------------------------------
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
type Person = {
  name: string;
  address: {
    city: string;
    country: string;
  };
  hobbies: string[];
};

type ReadonlyPerson = DeepReadonly<Person>;

// ------------------------------------------
type Merge<T1, T2> = {
  [K in keyof T1 | keyof T2]: K extends keyof T1
    ? K extends keyof T2
      ? T1[K] | T2[K]
      : T1[K]
    : K extends keyof T2
    ? T2[K]
    : never;
};
type Type1 = { name: string; age: number };
type Type2 = { age: string; city: string };

type MergedType = Merge<Type1, Type2>;

// ------------------------------------------

type PickByType<T, U> = {
  [K in keyof T]: T[K] extends U ? T[K] : never;
};
type Person2 = {
  name: string;
  age: number;
  isAdmin: boolean;
};

type StringProperties = PickByType<Person2, string>;

// ------------------------------------------

type DeepPartial<T> = {
  [key in keyof T]?: T[key] extends object
    ? DeepPartial<T[key]>
    : T[key];
};

type Person3 = {
  name: string;
  address: {
    street: string;
    city: string;
  };
};

type PartialPerson = DeepPartial<Person>;

// ------------------------------------------

type A = { id: number; name: string; isActive: boolean };
type B = { isActive: boolean };

type RemoveType<T,U> = Pick<{[K in keyof T]: T[K] extends U? never : T[K]}, keyof T>
 
type Result = RemoveType<A, B>;

// ------------------------------------------

type ReadonlyPerson2 = {
  readonly name: string;
  readonly age: number;
};

type Mutable<T>={
 -readonly [K in keyof T]: T[K]
}

type Person4 = Mutable<ReadonlyPerson2>;

// ------------------------------------------

type Person5 = {
  name: string;
  age?: number;
  address: string;
};

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];


// type RequiredKeys<T> = {
//   [K in keyof T]: T[K] extends Required<T>[K] ? K : never;
// }[keyof T];

type Result2 = RequiredKeys<Person5>;

// ------------------------------------------

type Person6 = {
  name: string;
  age?: number;
  address?: string;
};

type OptionalKeys<T>={
[K in keyof T]: T[K] extends
}

type Result3 = OptionalKeys<Person6>;
// Expected: "age" | "address"
