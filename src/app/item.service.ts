import { Injectable }                       from '@angular/core';
import { WikidataService }                  from "./wikidata.service";
import  * as wdk                            from "wikidata-sdk";
import {Item}                               from "./item";
import {Md5}                                from "ts-md5";

@Injectable()
export class ItemService {

  constructor(private wikidataService: WikidataService) { }

  buildItem(wdEntities, qwd, image) {
    let item = new Item();
    let wdEntity = this.wikidataService.getWdEntity(wdEntities, qwd);

    item.labels = wdk.simplify.labels(wdEntity.labels);
    item.descriptions = wdk.simplify.descriptions(wdEntity.descriptions);
    item.qwd = 'Q'+qwd;

    if(wdEntity.claims.P136 !== undefined) { // Genre
      item.P136 = wdk.simplify.propertyClaims(wdEntity.claims.P136);
    } else { item.P136 = []; }
    if(wdEntity.claims.P571 !== undefined) { // Date of creation
      item.P571 = wdk.simplify.propertyClaims(wdEntity.claims.P571);
    } else { item.P571 = []; }
    if(wdEntity.claims.P170 !== undefined) { // Creator
      item.P170 = wdk.simplify.propertyClaims(wdEntity.claims.P170);
    } else { item.P170 = []; }
    if(wdEntity.claims.P195 !== undefined) { // Collection
      item.P195 = wdk.simplify.propertyClaims(wdEntity.claims.P195);
    } else { item.P195 = []; }
    if(wdEntity.claims.P973 !== undefined) { // Described At
      item.P973 = wdk.simplify.propertyClaims(wdEntity.claims.P973);
    } else { item.P973 = []; }
    if(wdEntity.claims.P180 !== undefined) { // Depicts
      item.P180 = wdk.simplify.propertyClaims(wdEntity.claims.P180);
    } else { item.P180 = []; }

    if(image !== null) {
      item.thumbnail = ItemService.getThumbnail(image);
    } else {
      item.thumbnail = null;
    }

    return item;
  }

  static getThumbnail (image) {
    let imageName = decodeURI(image);
    imageName = imageName.replace("http://commons.wikimedia.org/wiki/Special:FilePath/", "").replace(/ /g, "_").replace(/%2C/g, ",");
    let hash = Md5.hashStr(imageName);
    //return "https://upload.wikimedia.org/wikipedia/commons/thumb/" + hash.substring(0, 1) + "/" + hash.substring(0, 2) + "/" + imageName + "/400px-" + imageName;
  }

  /** Return a property from an item */
  getProperty (item, property, lang, nullable) {
    if(lang !== null && item[property][lang] !== undefined) {
      return item[property][lang];
    } else {
      if (item[property].en !== undefined) {
        return item[property].en;
      } else if (item[property].fr !== undefined) {
        return item[property].fr;
      } else if (item[property].it !== undefined) {
        return item[property].it;
      } else if (item[property].de !== undefined) {
        return item[property].de;
      } else if (item[property].nl !== undefined) {
        return item[property].nl;
      } else if (item[property].es !== undefined) {
        return item[property].es;
      } else {
        let iVar = null;
        for (let sub in property) {
          iVar = property[sub].value;
        }
        if (iVar === null) {
          if(nullable === true) {
            iVar = null;
          } else {
            iVar = "No label found";
          }
        }
        return iVar;
      }
    }
  }

  getItemForLabelFromQwd(qwd) {
    console.log(qwd);
    return this.wikidataService.getWdEntities(qwd, null).then(function(wdEntities) {
        let item = this.buildItem(wdEntities, qwd, null);
        console.log(item);
        return item;
    });

  }
}
