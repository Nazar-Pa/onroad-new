import { Component, inject, OnInit } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IFormControl } from '../../shared/form-control.interface';
import  _  from 'lodash'
import { BaseService } from '../sevices/base.service';
import { NgIf } from '@angular/common';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-search-result',
  imports: [SearchFormComponent, ResultsComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent implements OnInit {
  formObject!: FormGroup;
  formControls!: IFormControl;
  route = inject(ActivatedRoute);
  baseService = inject(BaseService);
  searchedReoutes: any[] = [];

  ngOnInit(): void {
    this.baseService.showSearchIcon.set(false);

    this.route.queryParams.subscribe(
      (params: any) => {
        if (_.isEmpty(params) === false) {
          this.formControls = {
            from: params['from'],
            to: params['to'],
            routeDate: params['date'],
            numbOfPass: params['numbOfPass']
          }
        }
      }
    )
  }
}
