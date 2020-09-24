import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-card',
  templateUrl: './scroll-card.component.html',
  styleUrls: ['./scroll-card.component.css']
})
export class ScrollCardComponent implements OnInit {

  constructor() { }

  @Input() dat: any;
  @Input() ht: String;
  @Input() meta: String;
  

  ngOnInit(): void {
  }

}
