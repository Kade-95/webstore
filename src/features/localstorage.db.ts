import { CustomType, LocalDocument } from "../models/queries.model";
import { generateId } from "../shared/objectid";

export class LocalStorageDB<T>{
    get rawValue() {
        return localStorage.getItem(this.name);
    }

    get value() {
        const value = this.getValue();
        return value;
    }

    private setValue(value = this.value) {
        localStorage.setItem(this.name, JSON.stringify(value));
    }

    private getValue() {
        let data = this.rawValue;
        try {
            data = JSON.parse(data as string);
            if (!Array.isArray(data)) throw 'Not a list';
        } catch (error) {
            data = null
        }

        const value: LocalDocument<T>[] = data ? data : [];
        return value;
    }

    constructor(public name: string) {
        if (!this.value)
            this.setValue([]);
    }

    find(doc: Partial<LocalDocument<T>>) {
        return this.value.filter(v => {
            let flag: boolean = false;

            for (let k in v) {
                if ((doc as CustomType)[k]) {
                    flag = (v as CustomType)[k] === (doc as CustomType)[k];

                    if (!flag) return;
                }
            }
            return flag;
        });
    }

    findOne(doc: Partial<LocalDocument<T>>) {
        return this.value.find(v => {
            let flag: boolean = false;

            for (let k in v) {
                if ((doc as CustomType)[k]) {
                    flag = (v as CustomType)[k] === (doc as CustomType)[k];

                    if (!flag) return;
                }
            }
            return flag;
        });
    }

    insertMany(docs: T[]) {
        const data = this.value;
        for (let doc of docs)
            data.push({ ...doc, _id: generateId() });

        this.setValue(data);

        return docs as LocalDocument<T>[];
    }

    insertOne(doc: T) {
        const data = this.value;
        data.push({ _id: generateId(), ...doc });
        this.setValue(data);

        return doc as LocalDocument<T>;
    }

    insert(doc: T | T[]) {
        if (Array.isArray(doc)) {
            return this.insertMany(doc);
        }
        else {
            return this.insertOne(doc);
        }
    }

    updateMany(param: Partial<LocalDocument<T>>, doc: Partial<T>[]) {
        const found = this.find(param);
        let detail = { ok: false, n: 0 };
        if (found) {
            for (let i = 0; i < found.length; i++) {
                for (let j in doc) {
                    (found[i] as CustomType)[j] = (doc as CustomType)[j];
                }
            }

            let value = this.value.map(v => {
                found.map(f => {
                    if (v._id == f._id) {
                        v = f;
                        detail = { ok: true, n: detail.n++ };
                    }
                    return v;
                });

                return v;
            });

            this.setValue(value);
            detail = { ok: true, n: 1 };
        }

        return detail;
    }

    updateOne(param: Partial<LocalDocument<T>>, doc: Partial<T>) {
        const found = this.findOne(param);
        let detail = { ok: false, n: 0 };
        if (found) {
            for (let i in doc) {
                (found as CustomType)[i] = (doc as CustomType)[i];
            }

            let value = this.value.map(v => {
                if (v._id == found._id) {
                    detail = { ok: true, n: detail.n++ };
                    v = found;
                }
                return v;
            });

            this.setValue(value);
        }

        return detail;
    }

    update(param: Partial<LocalDocument<T>>, doc: Partial<T> | Partial<T>[]) {
        if (Array.isArray(doc)) {
            return this.updateMany(param, doc);
        }
        else {
            return this.updateOne(param, doc);
        }
    }

    delete(param: Partial<LocalDocument<T>>) {
        const found = this.find(param);
        let detail = { ok: false, n: 0 };

        if (found) {
            let value = this.value.filter(v => {
                let flag: boolean = true;
                found.map(f => {
                    if (v._id == f._id) {
                        detail.n++;
                        flag = false;
                    }
                });

                return flag;
            });

            this.setValue(value);
            detail = { ok: true, n: 1 };
        }

        return detail;
    }

    deleteOne(param: Partial<LocalDocument<T>>) {
        const found = this.findOne(param);
        let detail = { ok: false, n: 0 };

        if (found) {
            detail.ok = true;

            let value = this.value.filter(v => {
                let flag: boolean = true;
                if (v._id == found._id) {
                    detail.n++;
                    flag = false;
                }
                return flag;
            });
            this.setValue(value);
        }

        return detail;
    }

    drop() {
        localStorage.setItem(this.name, 'null');
    }
}