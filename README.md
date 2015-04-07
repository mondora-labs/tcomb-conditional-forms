#Catalogue

| TypeCatalogue | InputCatalogue |
|---------------|----------------|
| String | Textbox, Textarea, ... |
| Number | Numberbox, ... |
| Date | Datepicker, ... |
| Boolean | Checkbox, ... |
| Enum | Select, Radio, ... |
| Person | PersonForm, ... |
| Email | Email input, ... |
| Address | AddressForm, ... |
| ListOf(Type) | List, ... |

Form:

Tipo        -> Select (prende dal catalogo dei tipi)
Input       -> Select (prende dal catalogo degli input, in dipendenza dal tipo)
Label       -> Textbox
Required    -> Checkbox

Condition   -> Mongo Selector

```js
[
    {
        name: "name",
        allowedValues: ["a", "b", "c"],
        condition: {
            // condition 1
        }
    },
    {
        name: "name",
        allowedValues: ["d", "e", "f"],
        condition: {
            // condition 2
        }
    }
]
```

---

Flow:

Form with:

schema      |   label: Name of input
            |
            |   possible inputs:
            |       text
            |       textarea
            |       checkbox
            |       number
            |       radio
            |       select
            |       datepicker
            |       companies
            |       users
            |       tags
            |
            |   required
            |

condition   |   condition
            |       // mongo selector
            |


The form gets transformed into the following structure:

Field
{
    name: "My Field",
    inputType: "text",
    schema: {

    },
    condition: {
        // mongo selector
    }
}





Input catalogue
    each input has a type
    inputs can be configurable (eg, select and radio have options)
