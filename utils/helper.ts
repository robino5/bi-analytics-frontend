export function getFormattedHeaderDate<T extends Record<string, any>>(from: T | null | undefined, key: keyof T): string {
    if (from && key in from) {
        const value = from[key];
        return typeof value === 'string' ? value : String(value); // Ensure the value is converted to a string.
    }
    return "";
}