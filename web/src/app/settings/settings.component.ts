import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {
  settingsForm = new FormGroup({
    apiKey: new FormControl('', [Validators.required]),
    maxRequests: new FormControl(1, [Validators.required]),
    interval: new FormControl(15, [Validators.required]),
    autoRefreshInterval: new FormControl(2, [Validators.required])
  });

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const apiKey = this.storageService.getApiKey();
    if(apiKey) {
      this.settingsForm.controls.apiKey.patchValue(apiKey);
    }

    const maxRequests = this.storageService.getMaxRequests();
    if(maxRequests) {
      this.settingsForm.controls.maxRequests.patchValue(maxRequests);
    }

    const interval = this.storageService.getInterval();
    if(interval) {
      this.settingsForm.controls.interval.patchValue(interval);
    }

    const autoRefreshInterval = this.storageService.getAutoRefreshInterval();
    if(autoRefreshInterval) {
      this.settingsForm.controls.autoRefreshInterval.patchValue(autoRefreshInterval);
    }
  }

  save() {
    const { apiKey, maxRequests, interval, autoRefreshInterval } = this.settingsForm.value;

    if(apiKey && maxRequests && interval && autoRefreshInterval) {
      this.storageService.setApiKey(apiKey);
      this.storageService.setMaxRequests(maxRequests);
      this.storageService.setInterval(interval);
      this.storageService.setAutoRefreshInterval(autoRefreshInterval);
      this.goToDashboard();
    }
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
