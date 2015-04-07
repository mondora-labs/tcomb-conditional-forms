var t    = require("tcomb-validation");
var keys = require("lodash.keys");

/*
*   SchemaType is a tcomb type that describes a Schema.
*/

var BaseSchemaType = t.struct({
    required: t.maybe(t.Bool)
});

var SchemaType = t.subtype(t.Obj, function (schema) {
    var availableTypes = keys(types);
    return (
        t.validate(schema.type, t.enums.of(availableTypes)).isValid() &&
        t.validate(schema, types[schema.type]).isValid()
    );
});

var types = {
    "string": t.struct({
        allowedValues: t.maybe(t.list(t.Str))
    }).extend(BaseSchemaType),
    "number": t.struct({}).extend(BaseSchemaType),
    "boolean": t.struct({}).extend(BaseSchemaType),
    "list": t.struct({
        of: SchemaType
    }).extend(BaseSchemaType),
    "structure": t.struct({
        shape: t.dict(t.Str, SchemaType)
    }).extend(BaseSchemaType)
};

module.exports = SchemaType;
