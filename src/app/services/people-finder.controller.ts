import { Injectable } from '@angular/core';
import { Person } from '../components/people-finder/person.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class PeopleFinderController {
  constructor() {}

  // observable string sources
  private msGraphPersonInfoFoundSource = new Subject<Person>();
  private msGraphManagerInfoFoundSource = new Subject<Person>();

  // Observable string streams
  msGraphPersonInfoFound$ = this.msGraphPersonInfoFoundSource.asObservable();
  msGraphManagerInfoFound$ = this.msGraphManagerInfoFoundSource.asObservable();

  msGraphPersonInfo(personInfo: Person) {
    this.msGraphPersonInfoFoundSource.next(personInfo[0]);
  }

  msGraphManagerInfo(managerInfo: Person) {
    this.msGraphManagerInfoFoundSource.next(managerInfo);
  }
}
