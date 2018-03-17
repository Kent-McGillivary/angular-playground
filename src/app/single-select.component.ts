import { Component, OnChanges, Input, Output, ViewChild, EventEmitter, SimpleChanges } from "@angular/core";
import { TreeviewI18n, TreeviewItem, TreeviewConfig, DropdownTreeviewComponent, TreeviewHelper,
     } from "ngx-treeview";

import { DropdownTreeviewSelectI18n } from './dropdown-treeview-select-i18n';


@Component({
    selector: 'single-select-hierarchy',
    templateUrl: './single-select.component.html',
    styleUrls: [
        './single-select.component.css'
    ],
    providers: [
        { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }
    ]
})
export class SingleSelectComponent implements OnChanges {
    @Input() config: TreeviewConfig;
    @Input() singleSelectItems: TreeviewItem[];
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
    @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;
  
    private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;
    filterText: string;

    constructor(
        public i18n: TreeviewI18n
    ) {
        this.config = TreeviewConfig.create({
            hasAllCheckBox: false,
            hasCollapseExpand: false,
            hasFilter: true,
            maxHeight: 250
        });
        this.dropdownTreeviewSelectI18n = i18n as DropdownTreeviewSelectI18n;
       
    }
    

    ngOnChanges(changes: SimpleChanges) {
        if (this.value != null) {
            this.selectAll();
        } else {
            this.updateSelectedItem();
        }
    }
    
    select(item: TreeviewItem) {
       
            this.selectItem(item);
      
    }
    
    private updateSelectedItem() {
        if (this.singleSelectItems != null) {
            const selectedItem = TreeviewHelper.findItemInList(this.singleSelectItems, this.value);
            if (selectedItem) {
                this.selectItem(selectedItem);
            } else {
                this.selectAll();
            }
        }
    }
    
    private selectItem(item: TreeviewItem) {
      console.log("Select Item");
        this.dropdownTreeviewComponent.dropdownDirective.close();
        if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
            this.dropdownTreeviewSelectI18n.selectedItem = item;
            if (this.value !== item.value) {
                this.value = item.value;
                this.valueChange.emit(item.value);
            }
        }
    }
    
    private selectAll() {
        const allItem = this.dropdownTreeviewComponent.treeviewComponent.allItem;
        this.selectItem(allItem);
    }
}