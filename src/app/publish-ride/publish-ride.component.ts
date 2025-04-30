import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { cities, timeslots, prices } from '../../shared/cities';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { BaseService } from '../sevices/base.service';
import * as moment from 'moment';
import { RouteService } from '../sevices/route.service';

@Component({
  selector: 'app-publish-ride',
  imports: [MatCardModule, MatIconModule, ReactiveFormsModule, NgFor,
    MatDatepickerModule,
    DatePipe,
        NgIf,
        MatNativeDateModule,
        MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  templateUrl: './publish-ride.component.html',
  styleUrl: './publish-ride.component.scss'
})
export class PublishRideComponent implements OnInit {
  
  isDropDownShowing: boolean = false;
  panelOpenState = false;

  private formBuilder = inject(FormBuilder);
  baseService = inject(BaseService);
  routeService = inject(RouteService);
  cities = cities;
  timeSlots = timeslots;
  prices = prices;
  selected: Date = new Date();

  publishRideForm = this.formBuilder.group({
    fromCity: ['', Validators.required],
    toCity: ['', Validators.required],
    routeDate: [new Date(), Validators.required],
    time: ['', Validators.required],
    numbOfSeats: [1, Validators.required],
    price: [5, Validators.required],
    carModel: ['', Validators.required],
    driverName: ['', Validators.required],
    phone: ['', Validators.required],
    note: ['']
  });

  ngOnInit(): void {
    this.baseService.showSearchIcon.set(true);
  }

  onSubmit() {
    const timeF = this.publishRideForm.value.time as string;
    const [hours, minutes] = timeF?.split(':');
    const [month, day, year] = this.publishRideForm.value.routeDate?.toLocaleDateString().split('/') as string[];
    const date = new Date(+year, +month-1, +day, +hours, +minutes, +0);

    const {time, ...routeBody} = {...this.publishRideForm.value, routeDate: date.toISOString()}
    this.routeService.addRoute(routeBody).subscribe(res => console.log(res));
  }

  handleClick(operator: string) {
    const numbOfPassengers = this.publishRideForm?.value?.numbOfSeats;
    if(numbOfPassengers! >= 2 && operator === "subtract"){
      this.publishRideForm.controls['numbOfSeats'].setValue(numbOfPassengers! - 1);
    } else if(operator === "add") {
      this.publishRideForm.controls['numbOfSeats'].setValue(numbOfPassengers! + 1);
    }
  } 

  showDropCalendar(e: Event) {
    this.isDropDownShowing = !this.isDropDownShowing;
    e.preventDefault();
  }
  
}
