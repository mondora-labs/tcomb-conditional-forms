var t = require("tcomb-validation");
var R = require("ramda");

/*
*   SchemaType is a tcomb type that describes a Schema.
*/

var BaseSchemaType = t.struct({
    optional: t.maybe(t.Bool)
});

var SchemaType = t.subtype(t.Obj, function (schema) {
    var availableTypes = R.keys(types);
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
