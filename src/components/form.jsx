var assign = require("lodash.assign");
var React  = require("react");
var sift   = require("sift");
var t      = require("tcomb-react") && require("tcomb-form");

var inputCatalogue = require("../input-catalogue.js");
var FieldType      = require("../lib/field-type.js");
var parseSchema    = require("../lib/parse-schema.js");

var Form = React.createClass({
    propTypes: t.react.toPropTypes(t.struct({
        value: t.maybe(t.Obj),
        onChange: t.maybe(t.Func),
        schema: t.struct({
            fields: t.list(FieldType)
        })
    })),
    getStateFromProps: function (props) {
        return {
            value: props.value
        };
    },
    getInitialState: function () {
        return this.getStateFromProps(this.props);
    },
    componentWillReceiveProps: function (props) {
        this.setState(this.getStateFromProps(props));
    },
    getValue: function (raw) {
        return this.refs.form.getValue(raw);
    },
    triggerChange: function () {
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    },
    onChange: function (value) {
        this.setState({
            value: value
        }, this.triggerChange);
    },
    getTypeFromValue: function () {
        return t.struct(this.props.schema.fields
            .filter((function (field) {
                return sift(field.condition)(this.state.value);
            }).bind(this))
            .reduce(function (acc, field) {
                acc[field.name] = parseSchema(field.schema);
                return acc;
            }, {}));
    },
    getOptions: function () {
        return this.props.schema.fields
            .reduce(function (acc, field) {
                var input = inputCatalogue.get(field.inputType);
                acc.fields[field.name] = assign(input.options || {}, {
                    factory: input.component
                });
                return acc;
            }, {fields: {}});
    },
    render: function () {
        return (
            <t.form.Form
                ref="form"
                value={this.state.value}
                onChange={this.onChange}
                type={this.getTypeFromValue()}
                options={this.getOptions()}
            />
        );
    }
});

module.exports = Form;
