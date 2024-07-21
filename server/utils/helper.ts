
/**
 * @param obj 
 * @param fields 
 * @returns новый обект в котором только указоние ключи fields
 * T это обект K ключи обекта в массиве
 */
export function pickFields<T extends object, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    fields.forEach(field => {
        if (field in obj) {
            result[field] = obj[field];
        }
    });
    return result;
}
