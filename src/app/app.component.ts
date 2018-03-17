import { Component, OnInit, Input, TemplateRef, ViewChild, SimpleChanges, OnChanges, Output,EventEmitter } from '@angular/core';
import { TreeviewItem} from 'ngx-treeview';
import { BookService } from './book.service';
import { SingleSelectComponent } from './single-select.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
   
})
export class AppComponent implements OnInit {
  title = 'app';
  @Input() value: any;
 
  
  
  
  items: TreeviewItem[];
  values: number[];

   
    
  


  constructor(
   
    private service: BookService
) {
    
  
}

  ngOnInit() {
      this.items = this.service.getBooks();
  }

  
}
