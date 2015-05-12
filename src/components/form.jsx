var React = require("react");
var t     = require("tcomb-react") && require("tcomb-form");

var FieldType = require("../lib/field-type.js");
var formUtils = require("../lib/form-utils.js");

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
    render: function () {
        var type = formUtils.getType(
            this.props.schema,
            this.state.value
        );
        var options = formUtils.getOptions(
            this.props.schema,
            this.state.value,
            this.props.commonConfig
        );
        return (
            <t.form.Form
                ref="form"
                value={this.state.value}
                onChange={this.onChange}
                type={type}
                options={options}
            />
        );
    }
});

module.exports = Form;
