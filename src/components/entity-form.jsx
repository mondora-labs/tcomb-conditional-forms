var React     = require("react");
var bootstrap = require("react-bootstrap");
var t         = require("tcomb-form");
var tic       = require("tcomb-input-collection");

var inputCatalogue = require("../input-catalogue.js");
var FieldType      = require("../lib/field-type.js");
var FieldInput     = require("./field-input.jsx");

var AddFieldComponent = React.createClass({
    propTypes: {
        elements: React.PropTypes.array.isRequired,
        add: React.PropTypes.func.isRequired,
        config: React.PropTypes.object.isRequired
    },
    add: function () {
        /*
        *   We need to get a default input type for the field, otherwise erros
        *   will occur. TODO: figure out why adding an empty object rather than
        *   `undefined` throws strange errors. It surely has to do with tcomb,
        *   but I can't pinpoint exactly the cause and a possible solution that
        *   isn't a workaround like this one.
        */
        var defaultInputType = inputCatalogue.list()[0];
        this.props.add({
            name: "New field",
            inputType: defaultInputType,
            schema: {
                type: "string"
            },
            priority: 0,
            condition: {}
        });
    },
    render: function () {
        return (
            <bootstrap.Button block onClick={this.add}>
                {"Add field"}
            </bootstrap.Button>
        );
    }
});

var FieldComponent = React.createClass({
    propTypes: {
        element: React.PropTypes.object.isRequired,
        change: React.PropTypes.func.isRequired,
        remove: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            activeKey: "0"
        };
    },
    toggle: function () {
        this.setState({
            activeKey: (this.state.activeKey === "0" ? "1" : "0")
        });
    },
    renderHeader: function () {
        return (
            <span>
                <span onClick={this.toggle}>
                    {this.props.element.name}
                </span>
                <bootstrap.Button className="pull-right" bsSize="xsmall" onClick={this.props.remove}>
                    {"Remove"}
                </bootstrap.Button>
            </span>
        );
    },
    render: function () {
        // Collapsed by default
        return (
            <bootstrap.Accordion activeKey={this.state.activeKey} style={{marginBottom: 4}}>
                <bootstrap.Panel eventKey="1" header={this.renderHeader()}>
                    <t.form.Form
                        ref="form"
                        type={FieldType}
                        options={{factory: FieldInput}}
                        value={this.props.element}
                        onChange={this.props.change}
                    />
                </bootstrap.Panel>
            </bootstrap.Accordion>
        );
    }
});

var FieldListInput = React.createClass({
    render: function () {
        return (
            <tic.List
                {...this.props}
                addComponent={AddFieldComponent}
                elementComponent={FieldComponent}
            />
        );
    }
});

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
                    factory: FieldListInput
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
