var t = require("tcomb");

var SchemaType = require("./schema-type.js");

/*
*   FieldType is a tcomb type that describes a Field.
*/

var FieldType = t.struct({
    name: t.Str,
    inputType: t.Str,
    schema: SchemaType,
    condition: t.Obj
});

module.exports = FieldType;
