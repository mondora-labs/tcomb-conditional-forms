var R = require("ramda");
var t = require("tcomb");

var truthyKeys = R.pipe(
    R.pickBy(R.eq(true)),
    R.keys
);

var getSubStruct = R.curry(function (type, fieldsMap) {
    return t.struct(R.pick(truthyKeys(fieldsMap), type.meta.props));
});

module.exports = t.func([t.Type, t.dict(t.Str, t.Bool)], t.Type).of(getSubStruct);
