/*
*   A Schema is a JSON-serializable object that describes a tcomb type.
*
*   Example:
*
*   {
*       "type": "object",
*       "shape": {
*           "prop_0": {
*               "type": "string",
*               "required": true
*           },
*           "prop_1": {
*               "type": "string",
*               "allowedValues": ["value_0", "value_1"]
*           },
*           "prop_2": {
*               "type": "list",
*               "of": {
*                   "type": "number"
*               }
*           }
*       }
*   }
*
*   which get parsed in:
*
*   t.struct({
*       prop_0: t.maybe(t.Str),
*       prop_1: t.enums.of(["value_0", "value_1"]),
*       prop_2: t.list(t.Num)
*  })
*
*/

var t = require("tcomb-validation");
var R = require("ramda");

var SchemaType = require("./schema-type.js");

/*
*   The `parseSchema` function takes a schema and outputs a tcomb-type.
*
*   Not all tcomb types can be described by a schema, chiefly because functions
*   can't be serialized and therefore subtypes can't be serialized.
*/
var parsers = {
    string: function (schema) {
        return schema.allowedValues ? t.enums.of(schema.allowedValues) : t.Str;
    },
    number: function (schema) {
        return t.Str;
    },
    boolean: function (schema) {
        return t.Bool;
    },
    list: function (schema) {
        return t.list(parseSchema(schema.of));
    },
    structure: function (schema) {
        return t.struct(R.mapObj(parseSchema, schema.shape));
    }
};
var parseSchema = function (schema) {
    var type = parsers[schema.type](schema);
    return schema.required ? type : t.maybe(type);
};

/*
*   Export a type-checked version of the parseSchema function
*/
module.exports = t.func([SchemaType], t.Type).of(parseSchema);
