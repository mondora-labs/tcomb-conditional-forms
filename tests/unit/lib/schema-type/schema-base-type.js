var rewire = require("rewire");
var should = require("should");
var t      = require("tcomb-validation");

var SchemaType = rewire("lib/schema-type.js");

var BaseSchemaType = SchemaType.__get__("BaseSchemaType");

describe("BaseSchemaType", function () {

    describe("valid schemas", function () {
        it("valid `required` property", function () {
            var schema = {
                required: true
            };
            t.validate(schema, BaseSchemaType).isValid().should.equal(true);
        });
    });

    describe("invalid schemas", function () {
        it("invalid `required` property", function () {
            var schema = {
                required: "notABoolean"
            };
            t.validate(schema, BaseSchemaType).isValid().should.equal(false);
        });
    });

});
