import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  prefix = 'crypto-indicators';

  constructor() { }

  getApiKey(): string {
    return localStorage.getItem(`${this.prefix}-api-key`) ?? "";
  }

  getMaxRequests(): number {
    const value = localStorage.getItem(`${this.prefix}-max-requests`);
    return value ? parseInt(value) : 0;
  }

  getInterval(): number {
    const value = localStorage.getItem(`${this.prefix}-interval`);
    return value ? parseInt(value) : 0;
  }

  getAutoRefreshInterval(): number {
    const value = localStorage.getItem(`${this.prefix}-auto-refresh-interval`);
    return value ? parseInt(value) : 0;
  }

  setApiKey(value: string): void {
    localStorage.setItem(`${this.prefix}-api-key`, value);
  }

  setMaxRequests(value: number): void {
    localStorage.setItem(`${this.prefix}-max-requests`, value.toString());
  }

  setInterval(value: number): void {
    localStorage.setItem(`${this.prefix}-interval`, value.toString());
  }

  setAutoRefreshInterval(value: number): void {
    localStorage.setItem(`${this.prefix}-auto-refresh-interval`, value.toString());
  }
}
