"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const add_users_component_1 = require("./add-users.component");
describe('AddUsersComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [add_users_component_1.AddUsersComponent]
        });
        fixture = testing_1.TestBed.createComponent(add_users_component_1.AddUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
