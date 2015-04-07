var R     = require("ramda");
var React = require("react");
var sift  = require("sift");
var t     = require("tcomb-react") && require("tcomb-form");

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
        return R.pipe(
            R.filter((function (field) {
                return sift(field.condition)(this.state.value);
            }).bind(this)),
            R.map(function (field) {
                return [field.name, parseSchema(field.schema)];
            }),
            R.fromPairs,
            t.struct
        )(this.props.schema.fields);
    },
    getOptions: function () {
        return R.pipe(
            R.map(function (field) {
                return [field.name, {
                    factory: inputCatalogue.get(field.inputType).component
                }];
            }),
            R.fromPairs,
            R.createMapEntry("fields")
        )(this.props.schema.fields);
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
