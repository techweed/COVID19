import { Directive, OnInit, HostListener, HostBinding } from '@angular/core'

@Directive({
  selector: '[closeAlert]'
})
export class CloseAlert implements OnInit {
  @HostBinding('class') class: string = 'alert alert-success'


  ngOnInit() {}

  @HostListener('click') closealert(eventData: Event) {
    this.class = 'alert alert-success fade'
  }
}