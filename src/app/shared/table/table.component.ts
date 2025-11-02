import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createParamSearch } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {
  @Input() rows: T[] = []; // dữ liệu hàng
  @Input() columns: { field: keyof T; label: string; width?: string }[] = []; // cấu hình cột
  @Input() total: number = 0;
  @Input() isLoading: boolean = false;
  @Input() pagingMode: 'paging' | 'scroll' = 'scroll';
  @Output() isLoaded = new EventEmitter<number>();


  //paging
  @Input() totalPages: any;
  @Input() itemsPerPage: any;
  currentPage: number = 1;
  pageSize: number = 25;
  searchStr = '';
  constructor(private accountService: AccountService) {
    if (this.total) {
      this.totalPages = Math.ceil(this.total / this.itemsPerPage);
      alert(this.totalPages);
    }
  }

  ngOnInit(): void { }

  onScroll(e: any) {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 20) {
      if (this.isLoading) return; // tránh gọi lặp
      //this.isLoading = true;

      this.accountService
        .getAccounts(
          createParamSearch({
            last_name: this.searchStr,
            start: this.rows.length,
            limit: this.total,
          })
        )
        .subscribe((data) => {
          this.rows = [...this.rows, ...data]; // nối thêm dữ liệu mới
          this.isLoading = false;
        });
    }
  }
}
