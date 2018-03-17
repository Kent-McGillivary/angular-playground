import { TreeviewI18nDefault, TreeviewItem, TreeviewSelection } from "ngx-treeview";

export class DropdownTreeviewSelectI18n extends TreeviewI18nDefault {
    private internalSelectedItem: TreeviewItem;

    set selectedItem(value: TreeviewItem) {
        
            this.internalSelectedItem = value;
        
    }

    get selectedItem(): TreeviewItem {
        return this.internalSelectedItem;
    }

    getText(selection: TreeviewSelection): string {
        return this.internalSelectedItem ? this.internalSelectedItem.text : 'All';
    }
}