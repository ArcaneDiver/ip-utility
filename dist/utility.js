"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subStringInArrOfStr = function (arg, toBeSearched) {
    var res = [];
    for (var _i = 0, arg_1 = arg; _i < arg_1.length; _i++) {
        var e = arg_1[_i];
        if (e.search(toBeSearched) !== -1) {
            res.push(e);
        }
    }
    return res;
};
//# sourceMappingURL=utility.js.map