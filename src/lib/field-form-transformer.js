var catalogue = require("../input-catalogue.js");

exports.format = function (field) {
    return {
        name: field.name,
        inputType: field.inputType,
        allowedValues: field.schema.allowedValues,
        required: field.schema.required,
        condition: JSON.stringify(field.condition)
    };
};

exports.parse = function (value) {
    return {
        name: value.name,
        inputType: value.inputType,
        schema: catalogue.get(value.inputType).schemaGetter(value),
        condition: JSON.parse(value.condition)
    };
};