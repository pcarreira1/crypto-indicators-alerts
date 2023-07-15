import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';

interface IRsi {
  value?: number | null
}

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {
  server = "https://api.taapi.io/rsi";

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  async rsi(pair: string): Promise<IRsi> {
    try {
      const request = this.http.get<IRsi>(this.server, {
        params: {
          secret: this.storage.getApiKey(),
          exchange: "binance",
          symbol: pair,
          interval: "5m"
        }
      });

      return await firstValueFrom(request);
    } catch (ex) {
      console.error(ex);
      return Promise.resolve({
        value: null
      });
    }
  }
}
