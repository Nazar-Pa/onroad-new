import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  
  @Input() routes: any[] = [];
  @Input() type: string = '';
  routesResponse: any = {};
  page: number = 0;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
