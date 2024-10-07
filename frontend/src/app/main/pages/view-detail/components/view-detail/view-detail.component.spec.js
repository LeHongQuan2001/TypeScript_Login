"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const view_detail_component_1 = require("./view-detail.component");
describe('ViewDetailComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [view_detail_component_1.ViewDetailComponent]
        });
        fixture = testing_1.TestBed.createComponent(view_detail_component_1.ViewDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
