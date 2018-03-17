import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TreeviewModule } from 'ngx-treeview';
import { BookService } from './book.service';
import { SingleSelectComponent } from './single-select.component';
import { TreeDetail } from './d3/tree/tree-detail.component';

import {HttpClientModule} from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import {NgxTreeSelectModule, TreeSelectDefaultOptions} from 'ngx-tree-select';


const appRoutes: Routes = [
  { path: 'home', component: AppComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

const treeSelect = new TreeSelectDefaultOptions();
treeSelect.allowFilter =true;
treeSelect.filterPlaceholder= 'Type your filter here...';
treeSelect.maxVisibleItemCount=5;
treeSelect.idField='id';
treeSelect.textField='name';
treeSelect.childrenField= 'children';
treeSelect.allowParentSelection=true;


@NgModule({
  declarations: [
    AppComponent,
    SingleSelectComponent,
    TreeDetail
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TreeviewModule.forRoot(),
    NgxTreeSelectModule.forRoot(treeSelect)
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
