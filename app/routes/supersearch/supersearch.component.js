"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('../../shared/index');
var field_model_1 = require("./field.model");
var SuperSearchComponent = (function () {
    function SuperSearchComponent() {
        this.query = ' ';
        this.year = index_1.CURRENT_YEAR;
        this.fields = [];
        this.CURRENT_YEAR = index_1.CURRENT_YEAR;
        this.ARCHIVE_YEARS = index_1.ARCHIVE_YEARS;
    }
    SuperSearchComponent.prototype.ngOnInit = function () {
        this.addField();
    };
    SuperSearchComponent.prototype.addField = function () {
        this.fields.push(new field_model_1.FieldModel());
    };
    SuperSearchComponent.prototype.removeField = function (index) {
        this.fields.splice(index, 1);
    };
    SuperSearchComponent.prototype.search = function () {
        var totalQuery = '';
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            totalQuery += field.getQuery();
        }
        this.query = totalQuery;
    };
    __decorate([
        core_1.ViewChild(index_1.SearchResultsComponent), 
        __metadata('design:type', index_1.SearchResultsComponent)
    ], SuperSearchComponent.prototype, "SearchResults", void 0);
    SuperSearchComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/routes/supersearch/supersearch.component.html',
            styles: ['.input-group input {border-color: #cccccc;}'],
            directives: [index_1.SearchResultsComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SuperSearchComponent);
    return SuperSearchComponent;
}());
exports.SuperSearchComponent = SuperSearchComponent;
//# sourceMappingURL=supersearch.component.js.map