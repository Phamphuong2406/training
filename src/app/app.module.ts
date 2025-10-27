import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { fakeBackendProvider } from './core/services/fake-backend';
import { AccountService } from './core/services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './shared/components/table/table.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxInfiniteScrollComponent } from './components/ngx-infinite-scroll/ngx-infinite-scroll.component';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, InfiniteScrollModule, CommonModule],
  declarations: [AppComponent, TableComponent, NgxInfiniteScrollComponent],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider
  ]
})
export class AppModule {
}
