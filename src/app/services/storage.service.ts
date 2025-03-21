import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem<T>(key: string, value: T): void {

    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  containsKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  getAllKeys(): string[] {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
    }

    return keys;
  }
}
