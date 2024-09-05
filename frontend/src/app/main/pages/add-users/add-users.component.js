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
exports.AddUsersComponent = void 0;
const core_1 = require("@angular/core");
const toasts_service_1 = require("../../features/toasts/toasts.service");
let AddUsersComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-add-users',
            templateUrl: './add-users.component.html',
            styleUrls: ['./add-users.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AddUsersComponent = _classThis = class {
        constructor(http, router) {
            this.http = http;
            this.router = router;
            this.imageSrc = null;
            this.imageName = null;
            this.imageSize = null;
            this.uploadProgress = false;
            this.toastService = (0, core_1.inject)(toasts_service_1.ToastsService);
            this.image = null;
            this.errors = [];
        }
        ngOnInit() { }
        onSubmit(form) {
            const formData = new FormData();
            formData.append('fullname', form.fullname);
            formData.append('username', form.username);
            formData.append('role_id', form.role_id);
            formData.append('email', form.email);
            formData.append('status', form.status);
            formData.append('address', form.address);
            formData.append('password', 'password');
            formData.append('phone', form.phone);
            if (this.image) {
                formData.append('avatar', this.image);
            }
            this.http.createItem('users', formData).subscribe({
                next: (data) => {
                    this.setToast(data['message'], 'toast--success', 3000);
                    this.router.navigate(['/users/list']);
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
                const file = input.files[0];
                this.image = file;
                this.imageName = file.name;
                this.imageSize = file.size / 1000;
                const reader = new FileReader();
                reader.onload = () => {
                    this.imageSrc = reader.result;
                };
                reader.readAsDataURL(file);
            }
        }
        triggerFileInputClick() {
            const fileInput = document.getElementById('upload');
            if (fileInput) {
                fileInput.click();
            }
        }
        removeImage() {
            this.imageSrc = null;
            this.imageName = null;
            this.imageSize = null;
        }
        setToast(message, classname, delay) {
            localStorage.setItem('template', message);
            localStorage.setItem('classname', classname);
            localStorage.setItem('delay', delay);
        }
    };
    __setFunctionName(_classThis, "AddUsersComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AddUsersComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AddUsersComponent = _classThis;
})();
exports.AddUsersComponent = AddUsersComponent;
