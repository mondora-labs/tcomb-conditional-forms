var React = require("react");
var t     = require("tcomb-form");

var inputCatalogue = require("../src/input-catalogue.js");
var Form           = require("../src/components/form.jsx");
var EntityForm     = require("../src/components/entity-form.jsx");

/*
*   Add some inputs to the catalogue
*/
inputCatalogue.add({
    name: "Text",
    fields: {},
    schemaGetter: function (fieldFormValue) {
        return {
            type: "string",
            required: fieldFormValue.required
        };
    },
    component: t.form.Textbox
});
inputCatalogue.add({
    name: "Checkbox",
    fields: {
        required: false
    },
    schemaGetter: function (fieldFormValue) {
        return {
            type: "boolean",
            required: true
        };
    },
    component: t.form.Checkbox
});
inputCatalogue.add({
    name: "Radio",
    fields: {
        allowedValues: true
    },
    schemaGetter: function (fieldFormValue) {
        return {
            type: "boolean",
            required: true
        };
    },
    component: t.form.Radio
});

var App = React.createClass({
    getInitialState: function () {
        return {
            schema: this.props.schema
        };
    },
    onEntityChange: function (value) {
        this.setState({
            schema: value
        });
    },
    render: function () {
        return (
            <div className="container-fluid">
                <br />
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                        <Form schema={this.state.schema} />
                    </div>
                    <div className="col-sm-4 col-sm-offset-1">
                        <EntityForm
                            value={this.state.schema}
                            onChange={this.onEntityChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
});

/*
*   Render the component
*/
var formSchema = {
    name: "My Entity",
    fields: [
        /*
        *   Produced by FieldForm-s
        */
        {
            name: "First Name",
            inputType: "Text",
            schema: {
                type: "string",
                required: true
            },
            condition: {/* Empty selector means always */}
        },
        {
            name: "Last Name",
            inputType: "Text",
            schema: {
                type: "string",
                required: true
            },
            condition: {/* Empty selector means always */}
        },
        {
            name: "Has email",
            inputType: "Checkbox",
            schema: {
                type: "boolean",
                required: true
            },
            condition: {/* Empty selector means always */}
        },
        {
            name: "Email address",
            inputType: "Text",
            schema: {
                type: "string",
                required: true
            },
            condition: {
                "Has email": true
            }
        }
    ]
};
React.render(<App schema={formSchema} />, document.body);
