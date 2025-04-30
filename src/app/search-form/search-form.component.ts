import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { cities } from '../../shared/cities';import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { IFormControl } from '../../shared/form-control.interface';
import  _  from 'lodash'
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-search-form',
  imports: [MatIconModule,
    MatDatepickerModule,
    NgIf,
    NgFor,
    MatNativeDateModule,
    DatePipe,
    ReactiveFormsModule,
    TruncatePipe
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit {
  @Input() formControls!: IFormControl;
  defaultFormField: boolean = true;
  paramsExist: boolean = false;
  selected: Date = new Date();
  isDropDownShowing = false;
  cities = cities;
  private formBuilder = inject(FormBuilder);
  searchForm = this.formBuilder.group({
    fromCity: ['', Validators.required],
    toCity: ['', Validators.required],
    routeDate: [new Date(), Validators.required],
    numberOfPass: [1]
  });
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    if (_.isEmpty(this.formControls)) {
      return
    } else {
      this.paramsExist = true;
      this.defaultFormField = !(window.innerWidth < 740) && this.paramsExist;
      const { from, to, routeDate, numbOfPass } = this.formControls;
      this.searchForm.patchValue({
        fromCity: from,
        toCity: to,
        routeDate: new Date(routeDate),
        numberOfPass: Number(numbOfPass)
      })
    }
  }

  onSubmit() {
    if (!this.searchForm.valid) return;

    const searchParams = {
      from: this.searchForm.value.fromCity,  
      to: this.searchForm.value.toCity,
      date: this.searchForm.value.routeDate,  
      numbOfPass: this.searchForm.value.numberOfPass
    }

    this.router.navigate(['/search-result'],
      { queryParams: searchParams })

      this.defaultFormField = false;
    
  }

  handleClick(operator: string) {
    const numbOfPassengers = this.searchForm?.value?.numberOfPass;
    if(numbOfPassengers! >= 2 && operator === "subtract"){
      this.searchForm.controls['numberOfPass'].setValue(numbOfPassengers! - 1);
    } else if(operator == "add") {
      this.searchForm.controls['numberOfPass'].setValue(numbOfPassengers! + 1);
    }
  } 

  showDropCalendar() {
    this.isDropDownShowing = !this.isDropDownShowing;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth >= 740) {
      this.defaultFormField = true;
    } else {
      this.defaultFormField = !this.paramsExist;
    }
  }
}
