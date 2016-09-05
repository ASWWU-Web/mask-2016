import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SearchResultsComponent, CURRENT_YEAR, ARCHIVE_YEARS } from '../../shared/index';
import { FieldModel } from "./field.model";


@Component({
  templateUrl: 'app/routes/supersearch/supersearch.component.html',
  styles: ['.input-group input {border-color: #cccccc;}'],
  directives: [ SearchResultsComponent ]
})

export class SuperSearchComponent {
  @ViewChild(SearchResultsComponent) SearchResults: SearchResultsComponent;
  query: string = ' ';
  year: string = CURRENT_YEAR;
  fields: FieldModel[] = [];
  CURRENT_YEAR: string = CURRENT_YEAR;
  ARCHIVE_YEARS: string[] = ARCHIVE_YEARS;

  ngOnInit() {
    this.addField();
  }

  addField(): void {
    this.fields.push(new FieldModel());
  }

  removeField(index: number): void {
    this.fields.splice(index,1);
  }

  search(): void {
    var totalQuery: string = '';
    for (let field of this.fields){
      totalQuery += field.getQuery();
    }
    this.query = totalQuery;
  }

}
