var rewire = require("rewire");
var should = require("should");
var t      = require("tcomb-validation");

var SchemaType = rewire("lib/schema-type.js");

var BaseSchemaType = SchemaType.__get__("BaseSchemaType");

describe("BaseSchemaType", function () {

    describe("valid schemas", function () {
        it("valid `optional` property", function () {
            var schema = {
                optional: true
            };
            t.validate(schema, BaseSchemaType).isValid().should.equal(true);
        });
    });

    describe("invalid schemas", function () {
        it("invalid `optional` property", function () {
            var schema = {
                optional: "notABoolean"
            };
            t.validate(schema, BaseSchemaType).isValid().should.equal(false);
        });
    });

});
