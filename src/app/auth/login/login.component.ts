import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alert = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {


  }

  // login = () => {
  //   // if((document.getElementById("nam") as HTMLInputElement).value !== (document.getElementById("pas") as HTMLInputElement).value)
  //   // this.arr = ["0", "1", "2", "3"];
  //   // else
  //   this.router.navigateByUrl('/register');
  // }

  login(form: NgForm) {
    // console.log(form.controls['name'].value);
    // console.log(form.controls['password'].value);
    // if(form.controls['name'].value == "covid" && form.controls['password'].value == "covid") {
    //   localStorage.setItem('access_token', "jwt_token");
    //   this.router.navigateByUrl('/home');
    // }
    // this.http.get('https://covid19-edc2f.firebaseio.com/posts.json')
    //   .pipe(map(responseData => {
    //     const users = [];
    //     for (const key in responseData) {
    //       users.push({ ...responseData[key], id: key });
    //     }
    //     return users;
    //   }
    //   ))
    //   .subscribe(users => {
    //     // console.log(users);

    //   });
    let users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      let userFound = users.find(obj => {
        return (obj.email == form.controls['email'].value && obj.password == form.controls['password'].value);
      })
      if (userFound) {
        localStorage.setItem('access_token', "jwt_token");
        this.router.navigateByUrl('/home');
      } else {
        this.alert = true;
      }
    } else {
      this.alert = true;

    }


  }

  // close = (x) => {
  //   //this.arr.splice(x, 1);
  //   this.arr[x] = ""
  // }

}
