var assign = require("lodash.assign");
var pluck  = require("lodash.pluck");
var sortBy = require("lodash.sortby");
var sift   = require("sift");
var t      = require("tcomb-form");

var inputCatalogue = require("../input-catalogue.js");
var parseSchema    = require("./parse-schema.js");

var getFilteredFields = function getFilteredFields (schema, value) {
    return schema.fields
        .filter(function (field) {
            return sift(field.condition)(value);
        });
};

var getType = function getType (schema, value) {
    var typeMap = getFilteredFields(schema, value)
        .reduce(function (acc, field) {
            acc[field.name] = parseSchema(field.schema);
            return acc;
        }, {});
    return t.struct(typeMap);
};

var getOptionsFromField = function getOptionsFromField (field, commonConfig) {
    var input = inputCatalogue.get(field.inputType);
    return assign(input.options || {}, {
        factory: input.component,
        commonConfig: commonConfig
    });
};

var getOptions = function getOptions (schema, value, commonConfig) {
    var fields = getFilteredFields(schema, value);
    return {
        fields: fields.reduce(function (acc, field) {
            acc[field.name] = getOptionsFromField(field, commonConfig);
            return acc;
        }, {}),
        order: pluck(sortBy(fields, "priority"), "name")
    };
};

exports.getOptions = getOptions;
exports.getType    = getType;
