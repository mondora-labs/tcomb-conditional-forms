/*
*   The Input catalogue is simply a dictrionary of Inputs, whereas an Input is
*   an object like:
*
*   {
*       "name": "inputName",
*       "fields": {
*           "allowedValues": true
*       },
*       "schemaGetter": function (value) {
*           // ...
*       },
*       "components": ReactClass_0,
*       "options": {
*           // ...
*       }
*   }
*
*/

var cloneDeep = require("lodash.clonedeep");
var keys      = require("lodash.keys");
var t         = require("tcomb");

var SchemaType = require("./lib/schema-type.js");

var catalogue = {};

var InputType = t.struct({
    name: t.Str,
    fields: t.dict(t.Str, t.Bool),
    schemaGetter: t.func([t.Obj], SchemaType),
    component: t.Func,
    options: t.maybe(t.Obj)
});

var add = function (input) {
    var exists = catalogue[input.name];
    if (exists) {
        throw new Error("Input with name `" + input.name + "` already exists");
    }
    catalogue[input.name] = cloneDeep(input);
};
exports.add = t.func([InputType], t.Nil).of(add);

var list = function () {
    return keys(catalogue);
};
exports.list = t.func([], t.list(t.Str)).of(list);

var get = function (name) {
    return cloneDeep(catalogue[name]);
};
exports.get = t.func([t.Str], InputType).of(get);
