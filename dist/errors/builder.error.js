"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderError = void 0;
var BuilderError = /** @class */ (function () {
    function BuilderError() {
    }
    BuilderError.returnApiMessage = function (message) {
        return {
            "error": message
        };
    };
    return BuilderError;
}());
exports.BuilderError = BuilderError;
