import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormControl } from '../../shared/form-control.interface';
import  _  from 'lodash'
import { BaseService } from '../sevices/base.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ResultsComponent } from '../results/results.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { cities } from '../../shared/cities';
import { Subject, takeUntil, tap } from 'rxjs';
import { RouteService } from '../sevices/route.service';

@Component({
  selector: 'app-search-result',
  imports: [
    // ResultsComponent,
    MatIconModule,
    MatDatepickerModule,
    NgIf,
    NgFor,
    MatNativeDateModule,
    DatePipe,
    ReactiveFormsModule,
    TruncatePipe,
    ResultsComponent
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent implements OnInit, OnDestroy {
  formObject!: FormGroup;
  formControls!: IFormControl;
  route = inject(ActivatedRoute);
  baseService = inject(BaseService);
  routeService = inject(RouteService);
  cities = cities;
  searchedReoutes: any[] = [];
  isDropDownShowing = false;
  defaultFormField: boolean = true;
  private formBuilder = inject(FormBuilder);
  router = inject(Router);
  paramsExist: boolean = false;
  searchForm = this.formBuilder.group({
    fromCity: ['', Validators.required],
    toCity: ['', Validators.required],
    routeDate: [new Date(), Validators.required],
    numberOfPass: [1]
  });
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.baseService.showSearchIcon.set(false);

    this.route.queryParams
    .pipe(takeUntil(this.destroy$))
    
    .subscribe(
      (params: any) => {
        if (_.isEmpty(params) === false) {
          this.paramsExist = true;
          this.defaultFormField = window.innerWidth >= 740 && this.paramsExist;
          this.formControls = {
            fromCity: params['from'],
            toCity: params['to'],
            routeDate: new Date(params['date']),
            numberOfPass: Number(params['numbOfPass'])
          }
          this.searchForm.patchValue(this.formControls)
          this.routeService.fetchSearchedRoutes(this.formControls, 0, 10)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => console.log(result))
          
        }
      }
    )
  }

  onSubmit() {
    if (!this.searchForm.valid) return;

    const searchParams = {
      from: this.searchForm.value.fromCity,  
      to: this.searchForm.value.toCity,
      date: this.searchForm.value.routeDate,  
      numbOfPass: this.searchForm.value.numberOfPass
    }

    console.log('search params', searchParams)

    this.routeService.fetchSearchedRoutes(searchParams).subscribe(res => console.log(res))
    
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
