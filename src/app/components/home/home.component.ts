import {Component, Input, OnInit} from '@angular/core';
import {Entity} from "../../entity";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() entity: Entity;
  @Input() wdEntities: Object;

  constructor() { }

  ngOnInit() {

  }

}
