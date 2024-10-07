"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const category_page_service_1 = require("./category-page.service");
describe('CategoryPageService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(category_page_service_1.CategoryPageService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
