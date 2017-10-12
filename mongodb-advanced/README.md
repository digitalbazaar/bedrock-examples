##Modal Example

The goal of this example is to create a page in which users may click a button, "Add Person", and add a person to a list of people. When the button is clicked, a modal will appear that allows the user to enter information about the person they would like to add to the list.  You may also add traits for people which will lead to our second modal showing up overtop of the first modal displayed.

Using bedrock's stackable-modal allows us to have modals that are stacked on top of one another to provide more freedom with the use of modals on your websites.

**Note**: This demo will require a [host file entry][] for
`bedrock.local` pointing to `127.0.0.1` (localhost).

See the [angular-basic][] example for additional details about implementing an AngularJS front-end.

See the [bedrock-angular-modal][] documentation for additional details about implementing stackable modals.

## Installation

```
npm install
```

## Running the demo

```
npm start
```

then, direct a web browser to `https://bedrock.local:18443/`

[host file entry]:http://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/
[angular-basic]:../angular-basic
[bedrock-angular-modal]:https://github.com/digitalbazaar/bedrock-angular-modal
