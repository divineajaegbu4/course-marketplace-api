export class Finder {
    static findItem(items, key, value) {
        return items.find(item => item[key] === value) || null;
    }

    static findIndex(items, key, value) {
        return items.findIndex(item => item[key] === value)
    }
}