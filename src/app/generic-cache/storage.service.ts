import { Injectable } from '@angular/core';
import {CachedItem} from './types/cached-item.type';
import {ExpirationTime} from './types/expiration-time.type';
import {environment} from '../../environments/environment';
import {neverExpire} from './types/no-expiration.type';

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
    return Array.from(localStorage.keys());
  }
}
