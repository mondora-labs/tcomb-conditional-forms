var rewire = require("rewire");
var should = require("should");
var t      = require("tcomb-validation");

var SchemaType = require("lib/schema-type.js");

describe("Schema for type list", function () {

    describe("valid schemas", function () {
        it("simple list", function () {
            var schema = {
                type: "list",
                of: {
                    type: "string"
                }
            };
            t.validate(schema, SchemaType).isValid().should.equal(true);
        });
    });

    describe("invalid schemas", function () {
        it("invalid `of` property", function () {
            var schema = {
                type: "list",
                of: {
                    notASchema: "notASchema"
                }
            };
            t.validate(schema, SchemaType).isValid().should.equal(false);
        });
    });

});
