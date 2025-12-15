import { NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [NgFor],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit, OnChanges {
  
  @Input() routes: any[] = [];
  @Input() type: string = '';
  routesResponse: any = {};
  page: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['routes'])
    this.routes = changes['routes'].currentValue;
  }

  ngOnInit(): void {
    console.log('ResultsComponent on init', this.routes)
  }

  findRoutes() {

  }

  goToFirstPage() {
    this.page = 0;
    this.findRoutes()
  }

  goToPreviousPage() {
    this.page--;
    this.findRoutes()
  }

  goToPage(page: number) {
    if (this.page === page){
      return;
    }
    this.page = page;
    this.findRoutes()
  }

  goToNextPage() {
    this.page++;
    this.findRoutes()
  }

  goToLastPage() {
    this.page = this.routesResponse.totalPages as number - 1;
    this.findRoutes()
  }

  get isLastPage(): boolean {
    return this.page == this.routesResponse?.totalPages as number - 1;
  }
}
