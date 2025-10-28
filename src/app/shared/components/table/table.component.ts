import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() rows: any[] = [];
  @Input() columns: { field: string; label: string; width?: string }[] = [];
  @Input() total: number = 0;
  @Input() isLoading: boolean = false;
  @Input() pagingMode: 'paging' | 'scroll' = 'paging';
  @Output() isLoaded = new EventEmitter<number>();
  currentPage: number = 1;
  pageSize: number = 25;
  constructor() {}

  ngOnInit(): void {}
  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.isLoaded.emit(page);
  }

  onScroll(e: any) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && this.pagingMode === 'scroll' && !this.isLoading) {
      this.isLoaded.emit(this.currentPage + 1);
    }
  }
}
