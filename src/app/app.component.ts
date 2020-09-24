import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Covid19';

  ngOnInit(){
    setTimeout(() => {
      let splashScreen = document.getElementById('splashScreenClass');
      splashScreen.remove();
    }, 5500);
  }
}
