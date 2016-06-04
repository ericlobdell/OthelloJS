System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MockDataBuilder;
    return {
        setters:[],
        execute: function() {
            MockDataBuilder = (function () {
                function MockDataBuilder(ctor) {
                    this._instance = new ctor();
                    for (var prop in this._instance)
                        this.bindSetter(prop);
                }
                MockDataBuilder.prototype.bindSetter = function (propertyName) {
                    var _this = this;
                    var propWithInitialCap = "" + propertyName[0].toUpperCase() + propertyName.substring(1);
                    var setter = "set" + propWithInitialCap;
                    this[setter] = function (value) {
                        return _this.set(propertyName, value);
                    };
                };
                MockDataBuilder.prototype.set = function (propertyName, value) {
                    this._instance[propertyName] = value;
                    return this;
                };
                MockDataBuilder.prototype.build = function () {
                    return this._instance;
                };
                return MockDataBuilder;
            }());
            exports_1("default", MockDataBuilder);
        }
    }
});
//# sourceMappingURL=MockDataBuilder.js.map