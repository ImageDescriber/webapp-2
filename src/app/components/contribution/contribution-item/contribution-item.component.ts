import { Component, OnInit, Input }         from '@angular/core';
import { environment }                      from '../../../../environments/environment';
import {WikidataService}                    from "../../../wikidata.service";

import { Entity }                           from '../../../entity';
import {Item}                               from "../../../item";
import {ItemService} from "../../../item.service";

@Component({
  selector: 'app-contribution-item',
  templateUrl: './contribution-item.component.html',
  styleUrls: ['./contribution-item.component.css']
})
export class ContributionItemComponent implements OnInit {
  @Input() entity: Entity;
  @Input() item: Item;
  environment: object = environment;
  WikidataService: WikidataService;

  constructor(private itemService: ItemService, private wikidataService: WikidataService) { }

  ngOnInit() {

  }

}
