import { FieldsInOrder } from '../../shared/index';
export class FieldModel {
  options: string[];
  selectedOption: string;
  value: string;

  constructor(fields?: string[]) {
    if (fields) {
      this.options = fields;
    } else {
      this.options = ['full_name','gender'].concat(FieldsInOrder);
    }
    if(this.options[0]){
      this.selectedOption = this.options[0];
    }
  }
  getQuery(): string {
    if (this.value && this.selectedOption)
      return this.selectedOption + '=' + this.value + ';';
    return '';
  }
  displayKey(key: string): string { return key.replace(/_/g, ' '); }

}
