export var deepMerge = <
    T extends Record<string, any>,
    U extends DeepPartial<T>
>(sourceObject: T, targetObject: U): T => {
    return Object.entries(targetObject).reduce(
        (acc, [key, value]) =>
            value instanceof Object && acc[key] instanceof Object
                ? { ...acc, [key]: deepMerge(acc[key], value) }
                : { ...acc, [key]: value },
        sourceObject
    );
};

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
  

