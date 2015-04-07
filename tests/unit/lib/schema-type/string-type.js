var rewire = require("rewire");
var should = require("should");
var t      = require("tcomb-validation");

var SchemaType = require("lib/schema-type.js");

describe("Schema for irreducible type string", function () {

    describe("valid schemas", function () {
        it("simple string", function () {
            var schema = {
                type: "string"
            };
            t.validate(schema, SchemaType).isValid().should.equal(true);
        });
        it("valid `allowedValues` property", function () {
            var schema = {
                type: "string",
                allowedValues: ["value_0", "value_1"]
            };
            t.validate(schema, SchemaType).isValid().should.equal(true);
        });
    });

    describe("invalid schemas", function () {
        it("invalid `allowedValues` property", function () {
            var schema = {
                type: "string",
                allowedValues: ["value_0", "value_1", 0]
            };
            t.validate(schema, SchemaType).isValid().should.equal(false);
        });
    });

});
