import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { response } from 'express/lib/express';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      designation: new FormControl('private'),
      sector: new FormControl()
    })
  }


  signup() {
    this.http.post('https://covid19-edc2f.firebaseio.com/posts.json', this.signUpForm.value).subscribe(responseData => {
      console.log(responseData);

    });
    if (localStorage.getItem('users')) {
      let users = JSON.parse(localStorage.getItem('users'));
      users.push(this.signUpForm.value);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      let users = [];
      users.push(this.signUpForm.value);
      localStorage.setItem('users', JSON.stringify(users));
    }
    this.router.navigateByUrl('/login');

  }

}

