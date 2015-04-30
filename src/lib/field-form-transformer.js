var catalogue = require("../input-catalogue.js");

exports.format = function (field) {
    return {
        name: field.name,
        inputType: field.inputType,
        allowedValues: (
            field.schema.allowedValues ||
            (field.schema.of && field.schema.of.allowedValues)
        ),
        required: field.schema.required,
        priority: field.priority,
        condition: JSON.stringify(field.condition)
    };
};

exports.parse = function (value) {
    return {
        name: value.name,
        inputType: value.inputType,
        schema: catalogue.get(value.inputType).schemaGetter(value),
        priority: parseInt(value.priority, 10) || 0,
        condition: JSON.parse(value.condition)
    };
};
