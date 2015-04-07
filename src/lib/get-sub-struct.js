var pick = require("lodash.pick");
var t    = require("tcomb");

var getSubStruct = function (type, fieldsMap) {
    return t.struct(pick(type.meta.props, function (value, key) {
        return fieldsMap[key];
    }));
};

module.exports = t.func([t.Type, t.dict(t.Str, t.Bool)], t.Type).of(getSubStruct);
