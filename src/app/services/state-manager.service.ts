import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {

  constructor() { }

  // Behavior Subjects
  private readonly _places = new BehaviorSubject<any>([]);
  private readonly _details = new BehaviorSubject<any>([]);
  private readonly _userCoords = new BehaviorSubject<string>('');
  private readonly _directionCoords = new BehaviorSubject<string>('');

  // Observables
  readonly places$ = this._places.asObservable();
  readonly details$ = this._details.asObservable();
  readonly userCoords$ = this._userCoords.asObservable();
  readonly directionCoords$ = this._directionCoords.asObservable();

  // Setters
  public setPlaces(val: any) {
    this._places.next(val);
  }

  public setDetails(val: any) {
    this._details.next(val)
  }

  public setuserCoords(val: any) {
    this._userCoords.next(val)
  }

  public setDirectionCoords(val: any) {
    this._directionCoords.next(val)
  }

  // Getters
  get places(): any {
    return this._places.getValue();
  }

  get details(): any {
    return this._details.getValue();
  }

  get userCoords(): any {
    return this._userCoords.getValue();
  }

  get directionCoords(): any {
    return this._directionCoords.getValue();
  }
}
