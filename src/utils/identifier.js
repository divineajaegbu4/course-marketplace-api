import {v7 as uuidv7} from 'uuid';

export class Identifier {
    static generateId() {
        return uuidv7()
    }
}