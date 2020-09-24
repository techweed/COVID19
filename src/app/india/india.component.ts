import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {
  cv4;
  total;
  death;
  cured;
  cv2;
  tot;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.http.get<any>('http://covid19-india-adhikansh.herokuapp.com/states').subscribe(data => {
      this.cv4 = data.state;
      localStorage.setItem('india', JSON.stringify(this.cv4));
      this.cv4.sort((a, b) => {
        if (a.total < b.total)
          return 1
        else
          return -1
      })
      this.total = this.cv4.map(({ name, total }) => ({ name: name, numbers: total }));
      this.cv4.sort((a, b) => {
        if (a.death < b.death)
          return 1
        else
          return -1
      })
      this.death = this.cv4.map(({ name, death }) => ({ name: name, numbers: death }));
      this.cv4.sort((a, b) => {
        if (a.cured < b.cured)
          return 1
        else
          return -1
      })
      this.cured = this.cv4.map(({ name, cured }) => ({ name: name, numbers: cured }));
    }, err => {
      console.log(err);
      if (localStorage.getItem('india')) {
        this.cv4 = JSON.parse(localStorage.getItem('india'));
        this.cv4.sort((a, b) => {
          if (a.total < b.total)
            return 1
          else
            return -1
        })
        this.total = this.cv4.map(({ name, total }) => ({ name: name, numbers: total }));
        this.cv4.sort((a, b) => {
          if (a.death < b.death)
            return 1
          else
            return -1
        })
        this.death = this.cv4.map(({ name, death }) => ({ name: name, numbers: death }));
        this.cv4.sort((a, b) => {
          if (a.cured < b.cured)
            return 1
          else
            return -1
        })
        this.cured = this.cv4.map(({ name, cured }) => ({ name: name, numbers: cured }));
      }

    });


    this.http.get<any>('https://api.covid19api.com/total/dayone/country/in').subscribe(data => {
      this.cv2 = data;
      for (let i in this.cv2) {
        this.cv2[i].Date = this.cv2[i].Date.substring(0, 10);
      }
      this.tot = this.cv2[this.cv2.length - 1];
    }, err => {
      console.log(err);
    });

    if (!this.tot) {
      this.tot = {
        Confirmed: '1855700',
        Deaths: '39121',
        Recovered: '1230688'
      }
    }


  }
}
