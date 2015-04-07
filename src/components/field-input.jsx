var R     = require("ramda");
var React = require("react");
var t     = require("tcomb-form");
var tic   = require("tcomb-input-collection");

var ConditionInput = require("./condition-input.jsx");
var inputCatalogue = require("../input-catalogue.js");
var transformer    = require("../lib/field-form-transformer.js");
var FieldType      = require("../lib/field-type.js");
var getSubStruct   = require("../lib/get-sub-struct.js");

var FieldInput = React.createClass({
    propTypes: {
        value: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired
    },
    // FIXME: waiting for tcomb-form issue #100 to be solved
    // getDefaultProps: function () {
    //     return {
    //         value: {
    //             schema: {},
    //             condition: {}
    //         }
    //     };
    // },
    getStateFromProps: function (props) {
        return {
            value: transformer.format(props.value || {
                schema: {},
                condition: {}
            })
        };
    },
    getInitialState: function () {
        return this.getStateFromProps(this.props);
    },
    componentWillReceiveProps: function (props) {
        this.setState(this.getStateFromProps(props));
    },
    triggerChange: function () {
        this.props.onChange(transformer.parse(this.state.value));
    },
    onFormChange: function (value) {
        this.setState({
            value: value
        }, this.triggerChange);
    },
    getValue: function () {
        var validation = this.refs.form.getValue(true);
        var field = transformer.parse(validation.value);
        return t.validate(field, FieldType);
    },
    getFormType: function () {
        var Type = t.struct({
            name: t.Str,
            inputType: t.enums.of(inputCatalogue.list()),
            allowedValues: t.list(t.Str),
            required: t.Bool,
            condition: t.Str
        });
        var input = this.state.value.inputType ? inputCatalogue.get(this.state.value.inputType) : {};
        var fields = R.merge({
            name: true,
            inputType: true,
            required: true,
            condition: true
        }, input.fields);
        return getSubStruct(Type, fields);
    },
    getFormOptions: function () {
        return {
            fields: {
                condition: {
                    // TODO integrate with https://github.com/fubhy/react-query-builder
                    factory: ConditionInput
                },
                allowedValues: {
                    factory: tic.TagsInput
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
                value={this.state.value}
                onChange={this.onFormChange}
            />
        );
    }
});

module.exports = FieldInput;
