import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject =new Subject<any>();

  sendEvent(){

this.subject.next(0);
  }

  getEvent():Observable<any>{

    return this.subject.asObservable()
  }
}
