import { Component, OnInit } from '@angular/core';
import { WeatherReportService } from 'src/app/weather/weather-report.service';
import { CompositeFilterDescriptor, State, SortDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import * as _ from 'lodash';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public cityName: string;
  public days: string;
  public fromDate: Date;
  public toDate: Date;
  public currentWeather: any;
  public weatherList : any = [];
  public showNoDataFound : boolean = false;
  public dataFound: boolean = false;
  public enSearch: boolean = true;
  public showInCelsius: boolean = true;
  constructor(private weatherService:WeatherReportService) { }

  ngOnInit() {
    this.days = '1';
  }

  getWeatherReport() {
    this.weatherService.getCurrentWeather(this.cityName,parseInt(this.days)).subscribe(res => {
      this.currentWeather = res;
      this.showNoDataFound = false;
      this.dataFound = true;
      this.resetGrid();
      this.setGridData();
      console.log(res);
      console.log(this.weatherList)
    },err => {
      this.showNoDataFound = true;
      this.dataFound = false;
    }
  );
    
}

enterName(s:string){
  if (s && s.length > 0){
    this.enSearch = false;
  }else{
    this.enSearch = true;
  }
}

changeTemp() {
  this.showInCelsius = !this.showInCelsius;
}

  public multiple = false;
  public allowUnsort = true;
  public count;
  public pageSize = 20;
  public sorting: boolean = false;
  public pagination: boolean = true;
  public type: string;
  public custFilter: boolean = false;
  public allFilter: boolean = false;
  public filter: CompositeFilterDescriptor;
  public stateInitial: State = {  //state for  tables
    skip: 0,
    take: 20,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: [{ field: 'PRODUCTID', operator: 'contains', value: '' }]
    }
  };
  public state: State;
  selectableSettings = 'selectableSettings';
  public sortInitial: SortDescriptor[] = [{
    field: 'RECORD_DATE',
    dir: 'desc'
  }];
  public sort: SortDescriptor[];
  public dataItems = new Array<any>();
  public gridViews: GridDataResult;

  resetGrid(){
    this.weatherList=[];
    this.sort = _.cloneDeep(this.sortInitial);
    this.state = _.cloneDeep(this.stateInitial);
    this.filter = this.state.filter;
  }

  setGridData() {
    if (this.filter && this.filter.filters && this.filter.filters.length>0){
      this.weatherList = filterBy(this.currentWeather.forecast.forecastday, this.filter);
    } else {
      this.weatherList = this.currentWeather.forecast.forecastday;
    }

    if (!this.sort || this.sort.length == 0 || this.sort[0].field == undefined || this.sort[0].dir == undefined) {
      // no need to sort.      
    } else {
      this.weatherList = orderBy(this.weatherList, this.sort);
    }
    // this.weatherList = (this.currentWeather.forecast.forecastday);
      //.slice(this.state.skip, this.state.skip + this.state.take)
    
    this.gridViews = {
      data: orderBy(this.weatherList.slice(this.state.skip, this.state.skip + this.state.take),this.sort),
      total: this.weatherList.length
    };
  }

  public sortChange(sort: SortDescriptor[]): void {
    let sortIdIndex = _.findIndex(sort, function(o) { return o.field == 'ID'; });
    if (sortIdIndex > -1) {
      sort.unshift({
        field: 'IDNum',
        dir: sort[sortIdIndex].dir
      });
    } 
    this.sorting = true;
    this.pagination = false;
    this.sort = sort;

     this.setGridData()
  }
  public pageChange(event: PageChangeEvent): void {
    this.pagination = true;
    this.sorting = false;
    this.state.skip = event.skip;
    this.state.take = event.take;
    if (event.skip == 0) {
      this.pageSize = event.take;
    } else {
      this.state.skip = event.skip;
      this.pageSize = this.pageSize;
    }
    
     this.setGridData()
  }

  public filterChange(filter: CompositeFilterDescriptor): void {    
    this.filter = filter;
     this.setGridData();
  }

  public stateChange(state: DataStateChangeEvent): void { //datastatechange event for  grid 
    this.state = state;
  }
  //#endregion
  }


