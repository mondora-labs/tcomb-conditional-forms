var rewire = require("rewire");
var should = require("should");
var t      = require("tcomb-validation");

var SchemaType = require("lib/schema-type.js");

describe("Schema for irreducible type boolean", function () {

    describe("valid schemas", function () {
        it("simple boolean", function () {
            var schema = {
                type: "boolean"
            };
            t.validate(schema, SchemaType).isValid().should.equal(true);
        });
    });

});
