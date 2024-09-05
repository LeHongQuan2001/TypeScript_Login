"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewDetailComponent = void 0;
const core_1 = require("@angular/core");
const toasts_service_1 = require("src/app/main/features/toasts/toasts.service");
let ViewDetailComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-view-detail',
            templateUrl: './view-detail.component.html',
            styleUrls: ['./view-detail.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _isShowEdit_decorators;
    let _isShowEdit_initializers = [];
    let _isShowEdit_extraInitializers = [];
    let _close_decorators;
    let _close_initializers = [];
    let _close_extraInitializers = [];
    var ViewDetailComponent = _classThis = class {
        constructor(http, route, router) {
            this.http = http;
            this.route = route;
            this.router = router;
            this.toastService = (0, core_1.inject)(toasts_service_1.ToastsService);
            this.item = {};
            this.url = "";
            this.errors = [];
            // delete
            this.isDelete = false;
            this.isDeleteSuccess = false;
            this.isDeleteFailed = false;
            this.idDelete = new Set();
            // update
            this.isShowEdit = __runInitializers(this, _isShowEdit_initializers, false);
            this.close = (__runInitializers(this, _isShowEdit_extraInitializers), __runInitializers(this, _close_initializers, new core_1.EventEmitter()));
            this.image = (__runInitializers(this, _close_extraInitializers), null);
            this.showImageTmp = "";
        }
        ngOnInit() {
            this.loadItem();
            this.router.url.split('/').forEach(segment => {
                if (segment === 'users') {
                    this.url = '/' + segment;
                }
            });
        }
        loadItem() {
            const id = this.route.snapshot.paramMap.get('id');
            this.http.getUser(id).subscribe({
                next: (data) => {
                    this.item = data["data"];
                },
                error: (error) => {
                    alert(`Error fetching items: ${error.message}`);
                }
            });
        }
        toggleDelete() {
            this.isDelete = !this.isDelete;
        }
        toggleDeleteSuccess() {
            this.isDeleteSuccess = !this.isDeleteSuccess;
            setTimeout(() => {
                this.router.navigate(["/users/list"]);
            }, 10000);
        }
        toggleDeleteFailed() {
            this.isDeleteFailed = !this.isDeleteFailed;
        }
        onClickDelete(item) {
            this.idDelete.add(item.id);
        }
        // update
        onSubmit(form) {
            const formData = new FormData();
            if (this.image) {
                formData.append('avatar', this.image);
            }
            formData.append('fullname', form.fullname);
            formData.append('username', form.username);
            formData.append('role_id', form.role_id);
            formData.append('email', form.email);
            formData.append('status', form.status);
            formData.append('address', form.address);
            formData.append('password', "password");
            formData.append('phone', form.phone);
            this.http.updateItem("users", formData, this.item.id).subscribe({
                next: (data) => {
                    this.toastService.show({ template: "Update successfully", classname: "toast--success", delay: 4000 });
                    this.loadItem();
                },
                error: (error) => {
                    this.toastService.show({
                        template: error['error']['data'],
                        classname: 'toast--error',
                        delay: 2000,
                    });
                },
            });
        }
        onFileSelected(event) {
            const input = event.target;
            if (input.files && input.files.length > 0) {
                this.image = input.files[0];
                this.showImageTmp = "http://localhost:3000/" + this.image.name;
            }
        }
    };
    __setFunctionName(_classThis, "ViewDetailComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _isShowEdit_decorators = [(0, core_1.Input)()];
        _close_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _isShowEdit_decorators, { kind: "field", name: "isShowEdit", static: false, private: false, access: { has: obj => "isShowEdit" in obj, get: obj => obj.isShowEdit, set: (obj, value) => { obj.isShowEdit = value; } }, metadata: _metadata }, _isShowEdit_initializers, _isShowEdit_extraInitializers);
        __esDecorate(null, null, _close_decorators, { kind: "field", name: "close", static: false, private: false, access: { has: obj => "close" in obj, get: obj => obj.close, set: (obj, value) => { obj.close = value; } }, metadata: _metadata }, _close_initializers, _close_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewDetailComponent = _classThis;
})();
exports.ViewDetailComponent = ViewDetailComponent;
