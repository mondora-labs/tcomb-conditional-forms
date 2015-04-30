var assign = require("lodash.assign");
var pluck  = require("lodash.pluck");
var sortBy = require("lodash.sortby");
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
        }),
        commonConfig: t.maybe(t.Obj)
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
    getFilteredFileds: function () {
        return this.props.schema.fields
            .filter((function (field) {
                return sift(field.condition)(this.state.value);
            }).bind(this));
    },
    getType: function () {
        return t.struct(this.getFilteredFileds()
            .reduce(function (acc, field) {
                acc[field.name] = parseSchema(field.schema);
                return acc;
            }, {}));
    },
    getOptionsFromField: function (field) {
        var input = inputCatalogue.get(field.inputType);
        return assign(input.options || {}, {
            factory: input.component,
            commonConfig: this.props.commonConfig
        });
    },
    getOptions: function () {
        var fields = this.getFilteredFileds();
        return {
            fields: fields.reduce((function (acc, field) {
                acc[field.name] = this.getOptionsFromField(field);
                return acc;
            }).bind(this), {}),
            order: pluck(sortBy(fields, "priority"), "name")
        };
    },
    render: function () {
        return (
            <t.form.Form
                ref="form"
                value={this.state.value}
                onChange={this.onChange}
                type={this.getType()}
                options={this.getOptions()}
            />
        );
    }
});

module.exports = Form;
