import { LocalStorageDB } from './features/localstorage.db';
interface Sample {
    name: string;
    age: number;
}

const db = new LocalStorageDB<Sample>('test');
// db.insert([
//     { name: 'kennedy', age: 23 },
//     { name: 'victor', age: 33 },
//     { name: 'kedy', age: 63 }
// ])

console.log(db.delete({age: 33}));
