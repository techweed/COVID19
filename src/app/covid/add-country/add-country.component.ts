import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  @Input() addC: boolean;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() updat = new EventEmitter<object>();
  @Input() temp: any;
  // @ViewChild('f') f: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal() {
    this.closeModal.emit(false);
  }

  onSubmit(f: NgForm) {
    let newCountry = f.value;
    if (!this.temp) {
      newCountry.CountryCode = "NEW_" + f.value.Country.substring(0, 2) + f.value.Country.slice(-2);
      newCountry.Slug = newCountry.CountryCode;
      newCountry.Date = (new Date).toISOString();
      if (localStorage.getItem('newCountries')) {
        let newCountries = JSON.parse(localStorage.getItem('newCountries'));
        newCountries.push(newCountry);
        localStorage.setItem('newCountries', JSON.stringify(newCountries));
      } else {
        let newCountries = [];
        newCountries.push(newCountry);
        localStorage.setItem('newCountries', JSON.stringify(newCountries));
      }
      this.updat.emit(newCountry);
    } else {
      let newCountries = JSON.parse(localStorage.getItem('newCountries'));
      newCountries.splice(newCountries.findIndex(obj => {
        return obj.Slug === this.temp.Slug
      }), 1);
      newCountry.CountryCode = "NEW_" + f.value.Country.substring(0, 2) + f.value.Country.slice(-2);
      newCountry.Slug = newCountry.CountryCode;
      newCountry.Date = (new Date).toISOString();
      newCountries.push(newCountry);
      localStorage.setItem('newCountries', JSON.stringify(newCountries));
      this.updat.emit(newCountry);
    }
    f.reset();
    this.toggleModal();
  }

}
