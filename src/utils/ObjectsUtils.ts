const getPropertyName = <T extends object>(obj: T, selector: (x: Record<keyof T, keyof T>) => keyof T): keyof T => {
    const keyRecord = Object.keys(obj).reduce((res, key) => {
        const typedKey = key as keyof T
        res[typedKey] = typedKey
        return res
    }, {} as Record<keyof T, keyof T>)
    return selector(keyRecord)
};
export default {getPropertyName};
