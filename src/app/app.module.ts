import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { NgbModule }                        from '@ng-bootstrap/ng-bootstrap';
import { UIRouterModule }                   from '@uirouter/angular';
import { HttpClientModule, HttpClient,
    HttpClientJsonpModule }                 from '@angular/common/http';
import localeFr                             from '@angular/common/locales/fr';
import localeFrExtra                        from '@angular/common/locales/extra/fr';
import { registerLocaleData }               from '@angular/common';
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

import { FlashMessagesModule }              from 'angular2-flash-messages';

import { homeState, aboutState }            from "./states";
import { uiRouterConfigFn }                 from './config/router.config';

import { AppComponent }                     from './app.component';
import { HeaderComponent }                  from './components/header/header.component';
import { FooterComponent }                  from './components/footer/footer.component';
import { HomeComponent }                    from './components/home/home.component';
import { AboutComponent }                   from './components/about/about.component';
import { GameComponent }                    from './components/game/game.component';
import { ContributionComponent }            from './components/contribution/contribution.component';
import { ContributionItemComponent }        from './components/contribution/contribution-item/contribution-item.component';
import { ContributionDepictsComponent }     from './components/contribution/contribution-depicts/contribution-depicts.component';

import { EntityService }                    from './entity.service';
import { EntityLogService }                 from './entity-log.service';
import { DepictService }                    from './depict.service';
import { WikidataService }                  from './wikidata.service';
import { ItemService } from './item.service';

let INITIAL_STATES =  [ homeState, aboutState ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContributionComponent,
    GameComponent,
    ContributionItemComponent,
    ContributionDepictsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    UIRouterModule.forRoot({ states: INITIAL_STATES, useHash: true, config: uiRouterConfigFn }),
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
      HttpClientModule,
      HttpClientJsonpModule,
      EntityService,
      EntityLogService,
      DepictService,
      WikidataService,
      ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
