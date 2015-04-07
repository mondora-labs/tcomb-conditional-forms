/*
*   The Input catalogue is simply a list of Input components, whereas an Input
*   component is an object with a `name` and a `component`.
*
*   {
*       "name": "inputName",
*       "fields": {
*           "allowedValues": true
*       },
*       "schemaGetter": function (value) {
*           // ...
*       },
*       "components": ReactClass_0
*   }
*
*/

var t = require("tcomb");
var R = require("ramda");

var SchemaType = require("./lib/schema-type.js");

var catalogue = {};

var InputType = t.struct({
    name: t.Str,
    fields: t.dict(t.Str, t.Bool),
    schemaGetter: t.func([t.Obj], SchemaType),
    component: t.Func
});

var add = function (input) {
    var exists = catalogue[input.name];
    if (exists) {
        throw new Error("Input with name `" + input.name + "` already exists");
    }
    catalogue[input.name] = R.clone(input);
};
exports.add = t.func([InputType], t.Nil).of(add);

var list = function () {
    return R.keys(catalogue);
};
exports.list = t.func([], t.list(t.Str)).of(list);

var get = function (name) {
    return R.clone(catalogue[name]);
};
exports.get = t.func([t.Str], InputType).of(get);
