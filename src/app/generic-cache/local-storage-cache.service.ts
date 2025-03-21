import {inject, Injectable} from '@angular/core';
import {StorageService} from '../services/storage.service';
import {ExpirationTime} from './types/expiration-time.type';
import {environment} from '../../environments/environment';
import {CachedItem} from './types/cached-item.type';
import {neverExpire} from './types/no-expiration.type';
import {ICache} from './icache.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCacheService implements ICache {

  private storageService: StorageService = inject(StorageService);

  setCache<T>(key: string,
              value: T,
              expirationTimeInSeconds: ExpirationTime = environment.genericCache.expirationTimeInSeconds): void {

    const _value: CachedItem<T> = {
      value,
      expirationTimeInSeconds: expirationTimeInSeconds,
      timestamp: Date.now(),
    };

    this.storageService.setItem(key, _value);
  }

  getCache<T>(key: string): T | null {
    const value = this.storageService.getItem(key);

    if (!value) {
      return null;
    }

    const _value: CachedItem<T> = value as CachedItem<T>;

    if (this.isItemExpired(_value)) {
      this.removeCache(key);
      return null;
    }
    console.log(`getCache for key: ${key}`);
    return _value.value
  }

  removeCache(key: string): void {
    this.storageService.removeItem(key);
  }

  clearCache(): void {
    localStorage.clear();
  }

  getAllCacheKeys(): string[] {
    return this.storageService.getAllKeys();
  }

  containsCacheKey(key: string): boolean {
    const keys = this.getAllCacheKeys();

    return keys.includes(key);
  }

  getAllCacheKeyOccurrences(partialKey: string): string[] {
    const keys = this.getAllCacheKeys();
    return keys.filter((key) => key.includes(partialKey));
  }

  removeCacheByPartialKeyName(partialKey: string): void {
    const keysToRemove = this.getAllCacheKeyOccurrences(partialKey);
    for (const key of keysToRemove) {
      this.removeCache(key);
    }
  }

  private isItemExpired<T>(value: CachedItem<T>): boolean {
    if (value.expirationTimeInSeconds !== neverExpire) {
      return Date.now() - value.timestamp > value.expirationTimeInSeconds * 1000;
    }
    return false;
  }
}
