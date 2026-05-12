export class QueryFilter {
    static filter(items, key, value) {
        return items.filter(item => item[key] === value);
    }
}