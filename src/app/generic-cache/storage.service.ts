import { Injectable } from '@angular/core';
import {CachedItem} from './types/cached-item.type';
import {ExpirationTime} from './types/expiration-time.type';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService<T> {

  setItem(key: string,
          value: T,
          expirationTimeInSeconds: ExpirationTime = environment.genericCache.expirationTimeInSeconds): void {
    const _value: CachedItem<T> = {
      value,
      expirationTimeInSeconds: expirationTimeInSeconds,
      timestamp: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(_value));
  }

  getItem(key: string): T | null {
    const value = localStorage.getItem(key) ?? '[]';

    if (!value) {
      return null;
    }

    const _value: CachedItem<T> = JSON.parse(value) as CachedItem<T>;

    if (this.isItemExpired(_value)) {
      localStorage.removeItem(key);
      return null;
    }

    return _value.value
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  private isItemExpired(value: CachedItem<T>): boolean {
    if (value.expirationTimeInSeconds !== 'never') {
      return Date.now() - value.timestamp > value.expirationTimeInSeconds * 1000;
    }
    return false;
  }
}
