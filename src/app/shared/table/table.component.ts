import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Account, createParamSearch } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit {
  @Input() rows: T[] = []; // dữ liệu hàng
  @Input() columns: { field: keyof T; label: string; width?: string }[] = []; // cấu hình cột
  @Input() total: number = 0;
  @Input() isLoading: boolean = false;
  @Input() totalItems!: number;
  @Input() pagingMode: 'paging' | 'scroll' = 'scroll';
  @Output() isLoaded = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();
  //paging
  @Input() totalPages: any;
  @Input() itemsPerPage: any;
  currentPage = 1;
  pageSize: number = 25;
  searchStr = '';
  hasMoreData = true;

  constructor(private accountService: AccountService) {
    if (this.totalItems) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      alert(this.totalItems);
    }
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['totalItems']) {
    //   console.log(this.totalItems);
    // }
  }
  trackByFn(index: number, item: any) {
    return item.id || index;

    // Nếu không có id thì dùng index tạm, nhưng nên có id là tốt nhất
  }

  onScroll(e: any) {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 20) {
      if (this.isLoading) return; // tránh gọi lặp
      this.isLoading = true;

      this.accountService
        .getAccounts(
          createParamSearch({
            last_name: this.searchStr,
            start: this.rows.length,
            limit: this.pageSize,
          })
        )
        .subscribe((data) => {
          this.rows = [...this.rows, ...data]; // nối thêm dữ liệu mới
          if (data.length < this.total) {
            this.hasMoreData = false; // ít hơn limit => hết data
          }
          this.isLoading = false;
        });
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.accountService
      .getAccounts(
        createParamSearch({
          last_name: this.searchStr,
          start: (this.currentPage - 1) * this.total,
          limit: this.total,
        })
      )
      .subscribe((data) => {
        this.rows = data;
      });
  }
  onSearch(event: any) {
    this.searchChange.emit(event.target.value);
  }
}
