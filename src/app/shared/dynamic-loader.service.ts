import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicLoaderService {
  private loadComponentSubject = new Subject<string>();

  loadComponent$ = this.loadComponentSubject.asObservable();

  loadComponent(componentName: string) {
    this.loadComponentSubject.next(componentName);
  }
}