import {UIRouter} from "@uirouter/angular";
import {visualizer} from "@uirouter/visualizer";
import {Injector, Injectable} from "@angular/core";
import {homeState} from "../states";
//import {PeopleService} from "../services/people.js";

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
    //const peopleService = injector.get(PeopleService);

    // Plunker embeds can time out.
    // Pre-load the people list at startup.
    //peopleService.getAllPeople();

    // If no URL matches, go to the `hello` state by default
    router.urlService.rules.otherwise({ state: 'home' });

    // Use ui-router-visualizer to show the states as a tree
    // and transitions as a timeline
    visualizer(router);
}