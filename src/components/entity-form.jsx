var React = require("react");
var t     = require("tcomb-form");

var FieldInput = require("./field-input.jsx");
var FieldType  = require("../lib/field-type.js");

var EntityForm = React.createClass({
    propTypes: {
        value: React.PropTypes.object,
        onChange: React.PropTypes.func
    },
    getFormType: function () {
        return t.struct({
            name: t.Str,
            fields: t.list(FieldType)
        });
    },
    getFormOptions: function () {
        return {
            fields: {
                fields: {
                    disableOrder: true,
                    item: {
                        factory: FieldInput
                    }
                }
            }
        };
    },
    render: function () {
        return (
            <t.form.Form
                ref="form"
                type={this.getFormType()}
                options={this.getFormOptions()}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
});

module.exports = EntityForm;
