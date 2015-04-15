var React = require("react");
var t     = require("tcomb-form");
var tic   = require("tcomb-input-collection");

var inputCatalogue = require("../").catalogue;
var Form           = require("../components").Form;
var EntityForm     = require("../components").EntityForm;

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
            type: "string",
            allowedValues: fieldFormValue.allowedValues || [],
            required: fieldFormValue.required
        };
    },
    component: t.form.Radio
});
inputCatalogue.add({
    name: "Date",
    fields: {
    },
    schemaGetter: function (fieldFormValue) {
        return {
            type: "string",
            required: fieldFormValue.required
        };
    },
    component: t.form.Textbox,
    options: {
        type: "date"
    }
});
inputCatalogue.add({
    name: "Multiselect",
    fields: {
        allowedValues: true
    },
    schemaGetter: function (fieldFormValue) {
        return {
            type: "list",
            of: {
                type: "string",
                allowedValues: fieldFormValue.allowedValues
            },
            required: fieldFormValue.required
        };
    },
    component: tic.Multiselect,
    options: {
        config: {
            columns: 2
        }
    }
});
inputCatalogue.add({
    name: "Tags",
    fields: {},
    schemaGetter: function (fieldFormValue) {
        return {
            type: "list",
            of: {
                type: "string"
            },
            required: fieldFormValue.required
        };
    },
    component: tic.SimpleStringList
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
            name: "Name",
            inputType: "Text",
            schema: {
                type: "string",
                required: true
            },
            condition: {/* Empty selector means always */}
        },
        {
            name: "Gender",
            inputType: "Radio",
            schema: {
                type: "string",
                allowedValues: ["M", "F"],
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
        },
        {
            name: "Birthday",
            inputType: "Date",
            schema: {
                type: "string",
                required: true
            },
            condition: {}
        },
        {
            name: "Hobbies",
            inputType: "Multiselect",
            schema: {
                type: "list",
                of: {
                    type: "string",
                    allowedValues: [
                        "Mountain Biking",
                        "Running",
                        "Football",
                        "Other"
                    ]
                },
                required: false
            },
            condition: {}
        },
        {
            name: "Other hobbies",
            inputType: "Tags",
            schema: {
                type: "list",
                of: {
                    type: "string"
                },
                required: false
            },
            condition: {
                "Hobbies": "Other"
            }
        }
    ]
};
React.render(<App schema={formSchema} />, document.body);
