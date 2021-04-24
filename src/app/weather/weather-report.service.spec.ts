import { TestBed } from '@angular/core/testing';

import { WeatherReportService } from './weather-report.service';

describe('WeatherReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherReportService = TestBed.get(WeatherReportService);
    expect(service).toBeTruthy();
  });
});
