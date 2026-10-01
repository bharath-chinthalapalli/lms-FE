// id.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  private idSubject = new BehaviorSubject<number | null>(null);
  id$ = this.idSubject.asObservable();

  setId(id: number| null) {
    this.idSubject.next(id);
  }
}
