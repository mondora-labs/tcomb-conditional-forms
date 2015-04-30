var t = require("tcomb");

var SchemaType = require("./schema-type.js");

/*
*   FieldType is a tcomb type that describes a Field.
*/

var FieldType = t.struct({
    name: t.Str,
    inputType: t.Str,
    schema: SchemaType,
    priority: t.Num,
    condition: t.Obj
});

module.exports = FieldType;
