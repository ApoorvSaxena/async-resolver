# Async-resolver

Async resolver implements a PubSub architecture where subscribers of events are decision makers (return promise when they receive an event) and after publishing an event, a publisher can get the decision of the subscribers.

### Where to use AsyncResolver?

I had a situation where we wanted to maintain distinct subscribers of an event, though wanted to act on the basis of how subscribers reacted.
> For example: Let's consider a case where there are several components on a webpage, whose state can be changed by the user and we allow every component to subscriber as listener to listen to a page transition so that we can check if a user is trying to move without saving data. Now, when an individual clicks on a link, we publish an event mentioning of the transition of the user from the page, though we want to ask every listener (or component) if user has made any changes to their state and is moving without saving them. In case there are any unsaved changes in any of the component, then we cancel the transition and instead dispay an information dialog to the user asking him to save information before proceeding further.

## Install

```sh
### NPM
npm install async-resolver

### Yarn
yarn add async-resolver
```


## Usage

```js
const AsyncResolver = require('async-resolver');
let resolver = new AsyncResolver();

resolver.subscribe('locationChange', function() {
	// custom logic
    return Promise.resolve();
});

resolver.subscribe('locationChange', function() {
	// custom logic
    return Promise.reject();
});

resolver
	.publish('locationChange', {
		promiseMethod: 'any'
	})
	.then(function(data) {
		console.log('locationChange possible');
	})
	.catch(function(data) {
		console.log('locationChange not possible');
	});
```

## API

### AsyncResolver()

Returns `AsyncResolver` function that can be instantiated.

### subscribe(eventName, callback)

Allows subscribing to the event and executing the callback when an event is published.

#### eventName

Type: `string`

Event published.

#### callback

Type: `function`

Callback to be executed when the publish event is received.

### publish(eventName, options)

Returns a promise, that defines the decision of subscribers.

#### eventName

Type: `string`

Event published.

#### options

Type: `object`

Options to be passed while publishing to an event.

##### options.promiseMethod

Type: `string`

Method to be applied at the collection of promises such as `all`, `any` etc. Here's [list of methods](http://bluebirdjs.com/docs/api/collections.html) supported by Promise collection.

## License

MIT © [Apoorv Saxena](https://apoorv.pro/)