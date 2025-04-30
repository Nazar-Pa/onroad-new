import { Component } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-home',
  imports: [SearchFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
