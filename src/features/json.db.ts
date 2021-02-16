export class JsonDB<T>{
    get rawValue() {
        return localStorage.getItem(this.name);
    }

    get value() {
        let data = this.rawValue;
        try {
            data = JSON.parse(data as string);
            if (!Array.isArray(data)) throw 'Not a list';
        } catch (error) {
            data = null
        }

        return data;
    }

    constructor(public name: string) {

        localStorage.setItem(name, JSON.stringify([]));
    }

    find() {
        // const data = localStorage.getItem(this.name);
        const a: Array<T> = [];
        return a;
    }
}