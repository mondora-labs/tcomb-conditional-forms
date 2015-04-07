var rewire = require("rewire");
var should = require("should");
var t      = require("tcomb-validation");

var SchemaType = require("lib/schema-type.js");

describe("Schema for irreducible type number", function () {

    describe("valid schemas", function () {
        it("simple number", function () {
            var schema = {
                type: "number"
            };
            t.validate(schema, SchemaType).isValid().should.equal(true);
        });
    });

});
