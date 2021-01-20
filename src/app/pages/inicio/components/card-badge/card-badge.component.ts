import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-badge',
  templateUrl: './card-badge.component.html',
  styleUrls: ['./card-badge.component.scss']
})
export class CardBadgeComponent implements OnInit {
  @Input() icon:string = '';
  @Input() title:string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
