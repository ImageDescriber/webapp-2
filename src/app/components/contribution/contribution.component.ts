import { Component, OnInit, Input }         from '@angular/core';
import {Item}                               from "../../item";
import {Entity}                             from "../../entity";
import {ItemService}                        from "../../item.service";
import { parser, serializer, filter }       from "wikidata-filter";

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {
  @Input() entity: Entity;
  @Input() wdEntities: Object;
  item: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    console.log(this.entity);
    console.log(this.wdEntities);

    this.item = this.itemService.buildItem(this.wdEntities, this.entity.qwd, this.entity.image);
    console.log(this.item);
  }

}
