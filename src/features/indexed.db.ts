// import { of } from 'rxjs'

// export class IndexedDb {
//     db = window.indexedDB;
//     isInitialized = false;

//     constructor(public name: string, public version: number) {

//     }

//     getVersion(version: string) {

//     }

//     init() {
//         const request = this.db.open(this.name);

//         request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
//         }

//         request.onsuccess = () => {
//             this.version = request.result.version || this.version;
//             this.isInitialized = true;
//         }
//     }

//     open() {

//     }

//     isCollection() {

//     }

//     createCollection() { }

//     emptyCollection(name: string) {

//     }

//     dropCollection(name: string) {

//     }

//     find() { }

//     findOne() { }

//     insert() {

//     }

//     insertOne() {

//     }

//     update() { }

//     updateOne() { }

//     save() {

//     }

//     delete() {

//     }

//     deleteOne() { }


// }