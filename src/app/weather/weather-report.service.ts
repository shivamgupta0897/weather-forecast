import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherReportService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(loc: string, days: number) {
    return this.http.get(`${environment.apiUrl}key=${environment.apiKey}&q=${loc}&days=${days}&aqi=no&alerts=no`)
  }
}
