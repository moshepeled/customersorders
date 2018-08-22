import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // protected subjects: { [key: string]: BehaviorSubject<any> } = {};
  lsName = 'customerorders/';
  constructor() {
  }

  clear() {
    localStorage.clear();
  }

  removeItem(key: string) {
    localStorage.removeItem(this.lsName + key);
  }

  getItem(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(this.lsName + key));
    } catch (err) {
      return null;
    }
  }

  setItem(key: string, data: any): boolean {
    try {
      localStorage.setItem(this.lsName + key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  addItem(data: any): boolean {
    const id = this.getNewKey();
    // console.log('new key = ' + id);
    data.id = id;
    try {
      localStorage.setItem(this.lsName + id, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }
  getAllItems(): Array<any> {
    const values = [];
    const keys = Object.keys(localStorage);
    let i: number = keys.length;

    while (i--) {

      if (keys[i].substring(0, this.lsName.length) === this.lsName) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
      }
    }
    return values;
  }

  getNewKey(): number {
    const keys = Object.keys(localStorage);
    let i = keys.length;
    let maxKey = 0;
    while (i--) {

      if (keys[i].substring(0, this.lsName.length) === this.lsName) {
        let currentKey = keys[i].substring(this.lsName.length);
        // console.log('currentKey: ' + currentKey);
        // console.log(keys[i], this.getItem(keys[i]));
        // console.log(keys[i]);
        // console.log(this.lsName.length);
        // console.log(keys[i].substring(this.lsName.length));
        if (maxKey < Number(currentKey)) {
          maxKey = Number(currentKey);
        }
      }
    }

    return maxKey + 1;
  }
}
