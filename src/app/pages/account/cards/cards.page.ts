import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  cardData:any = [{
    cardNo: '1212',
  }]
  constructor() { }

  ngOnInit() {
  }

}
