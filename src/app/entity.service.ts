import { Injectable }                   from '@angular/core';
import { HttpClient, HttpHeaders }      from '@angular/common/http';

import { Observable ,  of }                   from 'rxjs';
import { catchError, map, tap }         from 'rxjs/operators';

import { Entity }                       from './entity';
import { FlashMessagesService }         from 'angular2-flash-messages';
import { environment }                  from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EntityService {

    private apiSuffix = '/entities';  // URL to web api

    constructor(
        private http: HttpClient,
        private _flashMessagesService: FlashMessagesService
    ) { }

    /** GET entities from the server */
    getEntities (): Observable<Entity[]> {
        return this.http.get<Entity[]>(environment.api+this.apiSuffix)
            .pipe(
                tap(entities => this.log(`fetched entities`)),
                catchError(this.handleError('getEntities', []))
            );
    }

    /** GET entity by id. Return `undefined` when id not found */
    getEntityNo404<Data>(id: number): Observable<Entity> {
        const url = `${environment.api+this.apiSuffix}/?id=${id}`;
        return this.http.get<Entity[]>(url)
            .pipe(
                map(entities => entities[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} entity id=${id}`);
                }),
                catchError(this.handleError<Entity>(`getEntity id=${id}`))
            );
    }

    /** GET random entity. */
    getEntityRandom() {
        const url = `${environment.api+this.apiSuffix}?random=true`;
        return this.http.get(url)
            .toPromise();
    }

    /** GET entity by id. Will 404 if id not found */
    getEntity(id: number): Observable<Entity> {
        const url = `${environment.api+this.apiSuffix}/${id}`;
        return this.http.get<Entity>(url).pipe(
            tap(_ => this.log(`fetched entity id=${id}`)),
            catchError(this.handleError<Entity>(`getEntity id=${id}`))
        );
    }

    /* GET entities whose name contains search term */
    searchEntities(term: string): Observable<Entity[]> {
        if (!term.trim()) {
            // if not search term, return empty entity array.
            return of([]);
        }
        return this.http.get<Entity[]>(`api/entities/?name=${term}`).pipe(
            tap(_ => this.log(`found entities matching "${term}"`)),
            catchError(this.handleError<Entity[]>('searchEntities', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new entity to the server */
    addEntity (entity: Entity): Observable<Entity> {
        return this.http.post<Entity>(environment.api+this.apiSuffix, entity, httpOptions).pipe(
            tap((entity: Entity) => this.log(`added entity w/ id=${entity.id}`)),
            catchError(this.handleError<Entity>('addEntity'))
        );
    }

    /** DELETE: delete the entity from the server */
    deleteEntity (entity: Entity | number): Observable<Entity> {
        const id = typeof entity === 'number' ? entity : entity.id;
        const url = `${environment.api+this.apiSuffix}/${id}`;

        return this.http.delete<Entity>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted entity id=${id}`)),
            catchError(this.handleError<Entity>('deleteEntity'))
        );
    }

    /** PUT: update the entity on the server */
    updateEntity (entity: Entity): Observable<any> {
        return this.http.put(environment.api+this.apiSuffix, entity, httpOptions).pipe(
            tap(_ => this.log(`updated entity id=${entity.id}`)),
            catchError(this.handleError<any>('updateEntity'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a EntityService message with the _flashMessagesService */
    private log(message: string) {
        this._flashMessagesService.show('EntityService: ' + message, { cssClass: 'alert-info', timeout: 2000 });
    }
}