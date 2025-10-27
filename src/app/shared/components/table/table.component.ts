import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() rows: any[] = [];
  @Input() columns: { field: string; label: string; width?: string }[] = [];
  @Input() total: number = 0;
  @Input() isLoading: boolean = false;
  @Input() pagingMode: 'paging' | 'scroll' = 'paging';

  constructor() { }

  ngOnInit(): void {
  }

}
