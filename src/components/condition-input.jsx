var React = require("react");
var t     = require("tcomb-form");

var ConditionInput = React.createClass({
    propTypes: {
        ctx: React.PropTypes.object.isRequired,
        value: React.PropTypes.any,
        onChange: React.PropTypes.func,
        options: React.PropTypes.object
    },
    getInitialState: function () {
        return {
            hasError: false,
            value: this.props.value
        };
    },
    componentWillReceiveProps: function (props) {
        // Needed, otherwise if we leave the condition field with non-JSON
        // inside and make some changes somewhere else, the value will be reset
        if (this.props.value !== props.value) {
            this.setState({
                value: props.value
            });
        }
    },
    triggerChange: function () {
        try {
            JSON.parse(this.state.value);
        } catch (ignore) {
            // Non-valid JSON, don't trigger changes
            return;
        }
        this.props.onChange(this.state.value);
    },
    onChange: function (evt) {
        this.setState({
            value: evt.target.value
        }, this.triggerChange);
    },
    getValue: function () {
        var validation = t.validate(this.state.value, this.props.ctx.report.type);
        this.setState({
            hasError: !validation.isValid()
        });
        return validation;
    },
    render: function () {
        return (
            <textarea className="form-control" value={this.state.value} onChange={this.onChange} />
        );
    }
});

module.exports = ConditionInput;
