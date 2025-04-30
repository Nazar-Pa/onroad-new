import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  showSearchIcon = signal<boolean>(false);

}