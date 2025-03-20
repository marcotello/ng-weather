import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {

  setItem(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): T {
    const value = localStorage.getItem(key) ?? '[]';
    return JSON.parse(value) as T;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
