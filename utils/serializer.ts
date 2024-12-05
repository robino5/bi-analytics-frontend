export const removeKeyFromObjects = <T>(
    data: Iterable<T>,
    field: keyof T,
    ignoreValue: T[keyof T]
): T[] => {
    return Array.from(data).filter((item) => {
        const value = item[field];
        return typeof value === 'string'
            ? value.trim() !== ignoreValue
            : value !== ignoreValue;
    });
};