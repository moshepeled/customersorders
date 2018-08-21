import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // protected subjects: { [key: string]: BehaviorSubject<any> } = {};

  constructor() {
  }

  clear() {
    localStorage.clear();
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getItem(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return null;
    }
  }
  setItem(key: string, data: any): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  addItem(data: any): boolean {
    const id = this.getNewKey();
    data.id = id;
    try {
      localStorage.setItem(id.toString(), JSON.stringify(data));
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
      values.push(this.getItem(keys[i]));
    }
    return values;
  }

  getNewKey(): number {
    const keys = Object.keys(localStorage);
    let i = keys.length;
    let maxKey = 0;
    while (i--) {
      if (maxKey < Number(keys[i])) {
        maxKey = Number(keys[i]);
      }
    }

    return maxKey + 1;
  }
}
