import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class ApiService {
  constructor() { }

  public getCountries(): Observable<any> {
    const resultData$ = Observable.create((observer) => {
      fetch(`https://api.covid19api.com/summary`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          observer.next(data)
          observer.complete()
        })
        .catch((err) => {
          observer.error(err)
        })
    })
    return resultData$
  }

  public getCharts(param): Observable<any> {
    const resultCharts = Observable.create((observer) => {
      fetch('https://api.covid19api.com/total/dayone/country/' + param)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          observer.next(data)
          observer.complete()
        })
        .catch((err) => {
          observer.error(err)
        })
    })
    return resultCharts
  }


}
