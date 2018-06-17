import { HomeComponent }        from "./components/home/home.component";
import { AboutComponent }       from "./components/about/about.component";
import {EntityService}          from "./entity.service";
import {WikidataService}        from "./wikidata.service";
import {Transition}             from "@uirouter/angular";

/** States */
export const homeState = {
    name: 'home',
    url: '/home',
    component: HomeComponent,
    resolve: [
        {
            token: 'entity',
            deps: [EntityService],
            resolveFn: (EntitySvc) => EntitySvc.getEntityRandom()
        },
        {
            token: 'wdEntities',
            deps: [WikidataService, 'entity'],
            resolveFn: (WikidataSvc, entity) => WikidataSvc.getWdEntities("Q"+entity.qwd, null)
        }
    ]
};
export const aboutState = { name: 'about', url: '/about',  component: AboutComponent };

/*export const peopleState = {
    name: 'people',
    url: '/people',
    component: People,
    resolve: [
        {
            token: 'people',
            deps: [PeopleService],
            resolveFn: (peopleSvc) => peopleSvc.getAllPeople()
        }
    ]
};

export const personState = {
    name: 'person',
    url: '/people/:personId',
    component: Person,
    resolve: [
        {
            token: 'person',
            deps: [Transition, PeopleService],
            resolveFn: (trans, peopleSvc) => peopleSvc.getPerson(trans.params().personId)
        }
    ]
};*/
