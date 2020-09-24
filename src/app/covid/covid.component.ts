import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  providers: [ApiService],
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  cv = [];
  cvApi = [];
  cv2;
  cv3;
  show = false;
  details;
  alert = false;
  addC = false;
  temp;
  dailyChart = false;
  chartTypeLine = true;
  sortCol = 'Country-d';

  @Input() countryName: any;

  constructor(private http: HttpClient, private router: Router, private dataService: ApiService) { }

  ngOnInit(): void {
    const retrievedCountries = this.dataService.getCountries()
    retrievedCountries.subscribe((data) => {
      this.cvApi = data.Countries;
      if (localStorage.getItem('newCountries')) {
        this.cv = this.cvApi.concat(JSON.parse(localStorage.getItem('newCountries')));
      } else {
        this.cv = this.cvApi;
      }
      this.sortd('Country');
      if (this.countryName) {
        this.fetchCountryDetails(this.countryName);
      }
    }, err => {
      console.log(err);
    })
    if (this.cv.length == 0) {
      this.cv = JSON.parse(localStorage.getItem('newCountries'));
    }
  }

  selectChangeHandler(event: any) {
    //document.getElementById("na").innerHTML = event;
    if (!event.Slug.startsWith('NEW_')) {
      this.fetchCountryDetails(event);
    }
  }

  clicker(x: any) {
    if (!x.Slug.startsWith('NEW_')) {
      this.fetchCountryDetails(x);
    }
  }

  edit(x: any) {
    event.stopPropagation();
    this.addC = true;
    var x2 = document.getElementById("tabl");
    x2.style.display = "none";
    let newCountries = JSON.parse(localStorage.getItem('newCountries'));
    this.temp = newCountries.find(obj => {
      return obj.Slug == x
    });
    // console.log("0", this.temp);
  }

  remove(x: any) {
    event.stopPropagation();
    let newCountries = JSON.parse(localStorage.getItem('newCountries'));
    newCountries.splice(newCountries.findIndex(obj => {
      return obj.Slug == x
    }), 1);
    localStorage.setItem('newCountries', JSON.stringify(newCountries));
    // console.log(result);
    if (localStorage.getItem('newCountries')) {
      this.cv = this.cvApi.concat(JSON.parse(localStorage.getItem('newCountries')));
    } else {
      this.cv.pop();
    }
    // this.cv.splice(x, 1);

  }

  fetchCountryDetails(id: any) {
    if (localStorage.getItem('access_token')) {
      this.show = false;
      let param;
      if (id.Slug) {
        param = id.Slug;
      } else {
        param = id;
      }


      const retrievedCharts = this.dataService.getCharts(param)
      retrievedCharts.subscribe((data) => {
        this.cv2 = data;
        this.cv3 = JSON.parse(JSON.stringify(data))
        for (let i in this.cv2) {
          this.cv2[i].Date = this.cv2[i].Date.substring(0, 10);
          if (+i == 0) {
            this.cv3[i].Confirmed = this.cv2[i].Confirmed;
            this.cv3[i].Active = this.cv2[i].Active;
            this.cv3[i].Recovered = this.cv2[i].Recovered;
            this.cv3[i].Deaths = this.cv2[i].Deaths;
            this.cv3[i].Date = this.cv2[i].Date;
          } else {
            this.cv3[i].Confirmed = this.cv2[i].Confirmed - this.cv2[+i - 1].Confirmed;
            this.cv3[i].Active = this.cv2[i].Active - this.cv2[+i - 1].Active;
            this.cv3[i].Recovered = this.cv2[i].Recovered - this.cv2[+i - 1].Recovered;
            this.cv3[i].Deaths = this.cv2[i].Deaths - this.cv2[+i - 1].Deaths;
            this.cv3[i].Date = this.cv2[i].Date;
          }
        }
        this.show = true;
        window.scrollTo(0, 0);
      }, err => {
        console.log("Country Not Found");
      })
    } else {
      this.alert = true;
    }

  }
  closeGraph() {
    this.show = false;
  }

  alertClose() {
    this.alert = false;
  }

  addCountry() {
    this.addC = true;
    var x = document.getElementById("tabl");
    x.style.display = "none";
  }

  closeModal(event) {
    this.temp = null;
    // console.log("2", this.cv);
    this.addC = event;
    var x = document.getElementById("tabl");
    x.style.display = "table";
  }

  updatd(event) {
    // console.log("up", event);
    if (localStorage.getItem('newCountries')) {
      this.cv = this.cvApi.concat(JSON.parse(localStorage.getItem('newCountries')));
    }
  }

  toggleChartMode() {
    this.show = false;
    this.dailyChart = !this.dailyChart;
    setTimeout(() => {
      this.show = true
    }, 1);

  }

  toggleChartType() {
    this.show = false;
    this.chartTypeLine = !this.chartTypeLine;
    setTimeout(() => {
      this.show = true
    }, 1);
  }

  sortd(str) {
    switch (str) {
      case 'Country':
        if (this.sortCol == 'Country') {
          this.cv.sort((a, b) => {
            if (a.Country < b.Country)
              return 1
            else
              return -1
          })
          this.sortCol = 'Country-d'
        } else {
          this.cv.sort((a, b) => {
            if (a.Country > b.Country)
              return 1
            else
              return -1
          })
          this.sortCol = 'Country'
        }
        break;
      case 'NewConfirmed':
        if (this.sortCol == 'NewConfirmed') {
          this.cv.sort((a, b) => {
            if (a.NewConfirmed < b.NewConfirmed)
              return 1
            else
              return -1
          })          
          this.sortCol = 'NewConfirmed-d'
        } else {
          this.sortCol = 'NewConfirmed'
          this.cv.sort((a, b) => {
            if (a.NewConfirmed > b.NewConfirmed)
              return 1
            else
              return -1
          })
        }
        break;
      case 'TotalConfirmed':
        if (this.sortCol == 'TotalConfirmed') {
          this.cv.sort((a, b) => {
            if (a.TotalConfirmed < b.TotalConfirmed)
              return 1
            else
              return -1
          })          
          this.sortCol = 'TotalConfirmed-d'
        } else {
          this.sortCol = 'TotalConfirmed'
          this.cv.sort((a, b) => {
            if (a.TotalConfirmed > b.TotalConfirmed)
              return 1
            else
              return -1
          })
        }
        break;
      case 'NewDeaths':
        if (this.sortCol == 'NewDeaths') {
          this.cv.sort((a, b) => {
            if (a.NewDeaths < b.NewDeaths)
              return 1
            else
              return -1
          })          
          this.sortCol = 'NewDeaths-d'
        } else {
          this.sortCol = 'NewDeaths'
          this.cv.sort((a, b) => {
            if (a.NewDeaths > b.NewDeaths)
              return 1
            else
              return -1
          })
        }
        break;
      case 'TotalDeaths':
        if (this.sortCol == 'TotalDeaths') {
          this.cv.sort((a, b) => {
            if (a.TotalDeaths < b.TotalDeaths)
              return 1
            else
              return -1
          })          
          this.sortCol = 'TotalDeaths-d'
        } else {
          this.sortCol = 'TotalDeaths'
          this.cv.sort((a, b) => {
            if (a.TotalDeaths > b.TotalDeaths)
              return 1
            else
              return -1
          })
        }
        break;
      case 'NewRecovered':
        if (this.sortCol == 'NewRecovered') {
          this.cv.sort((a, b) => {
            if (a.NewRecovered < b.NewRecovered)
              return 1
            else
              return -1
          })
          this.sortCol = 'NewRecovered-d'
        } else {
          this.sortCol = 'NewRecovered'
          this.cv.sort((a, b) => {
            if (a.NewRecovered > b.NewRecovered)
              return 1
            else
              return -1
          })
        }
        break;
      case 'TotalRecovered':
        if (this.sortCol == 'TotalRecovered') {
          this.cv.sort((a, b) => {
            if (a.TotalRecovered < b.TotalRecovered)
              return 1
            else
              return -1
          })          
          this.sortCol = 'TotalRecovered-d'
        } else {
          this.sortCol = 'TotalRecovered'
          this.cv.sort((a, b) => {
            if (a.TotalRecovered > b.TotalRecovered)
              return 1
            else
              return -1
          })
        }
        break;

    }


  }

}
