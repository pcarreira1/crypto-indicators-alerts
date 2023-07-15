import { Component, OnInit } from '@angular/core';
import { IndicatorsService } from '../services/indicators.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  symbols: {
    name: string,
    code: string,
    pair: string,
    image: string,
    indicators: {
      rsi?: number | null
    }
  }[] = [
    {
      name: "Bitcoin",
      code: "BTC",
      pair: 'BTC/USDT',
      image: "BTC.svg",
      indicators: {}
    },
    {
      name: "Ethereum",
      code: "ETH",
      pair: 'ETH/USDT',
      image: "ETH.svg",
      indicators: {}
    },
    {
      name: "Ripple",
      code: "XRP",
      pair: 'XRP/USDT',
      image: "XRP.svg",
      indicators: {}
    },
    {
      name: "Litecoin",
      code: "LTC",
      pair: 'LTC/USDT',
      image: "LTC.svg",
      indicators: {}
    },
    {
      name: "Monero",
      code: "XMR",
      pair: 'XMR/USDT',
      image: "XMR.svg",
      indicators: {}
    }
  ];

  retrieving = false;
  maxRequests = 0;
  interval = 1;
  autoRefresh = -1;

  constructor(
    private indicatorsService: IndicatorsService,
    private storage: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.maxRequests = this.storage.getMaxRequests();
    this.interval = this.storage.getInterval();
    this.getIndicators();
  }

  async getIndicators() {
    if(this.retrieving) {
      return;
    }

    this.retrieving = true;
    let count = 0;
    this.maxRequests = this.storage.getMaxRequests();
    this.interval = this.storage.getInterval();
    for(const symbol of this.symbols) {
      if(count >= this.maxRequests) {
        await this.delay(this.interval);
        count = 0;
      }

      count ++;
      const result = await this.indicatorsService.rsi(symbol.pair);
      symbol.indicators.rsi = result.value;
    }
    this.retrieving = false;
  }

  delay(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  enableAutoRefresh() {
    this.autoRefresh = Math.ceil(this.symbols.length / this.maxRequests) * this.interval + (this.storage.getAutoRefreshInterval() * 60);
    setInterval(this.getIndicators, this.autoRefresh * 1000);
  }

  disableAutoRefresh() {
    this.autoRefresh = -1;
  }

  goToSettings() {
    this.router.navigate(['settings']);
  }
}
