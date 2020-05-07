#### New thinks I've found whilst doing this project

- We call the function written in one JS file in another JS file - [see here](https://stackoverflow.com/questions/3809862/can-we-call-the-function-written-in-one-javascript-in-another-js-file/3811763)

- [Building a Simple CRUD app with Node, Express, and MongoDB](https://zellwk.com/blog/crud-express-mongodb/)

---

We can handle the response from the server via a then object. (We do this because fetch returns a **promise**). However, Fetch is slightly different from most promises. You need to use another then object to get the response from the server.

Here’s what you should do:
```javascript
fetch({ /* request */ })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    console.log(response)
  })
```
- [Using Fetch](https://css-tricks.com/using-fetch/)

Whenever we send or retrieve information with JavaScript, we initiate a thing known as an Ajax call. Ajax is a technique to send and retrieve information behind the scenes without needing to refresh the page. It allows browsers to send and retrieve information, then do things with what it gets back, like add or change HTML on the page. 

Fetch returns a Promise, which is a way to handle asynchronous operations without the need for a callback.

To do something after the resource is fetched, you write it in a .then call:
```javascript
fetch('https://api.github.com/users/chriscoyier/repos')
  .then(response => {/* do something */})
```
Fetch returns a response that tells you the status of the request. We can see that the request is successful (ok is true and status is 200), but a list of Chris’ repos isn’t present anywhere!

Turns out, what we requested from Github is hidden in body as a readable stream. We need to call an appropriate method to convert this readable stream into data we can consume.

Since we’re working with GitHub, we know the response is JSON. We can call response.json to convert the data.

All these conversion methods (response.json et all) returns another Promise, so we can get the data we wanted with yet another .then call.
```javascript
fetch('https://api.github.com/users/chriscoyier/repos')
  .then(response => response.json())
  .then(data => {
    // Here's a list of repos!
    console.log(data)
  });

  ----------
  Sending data with Fetch
  configure your fetch request with three options.

fetch('some-url', options);
```

- [Understanding And Using REST APIs](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/)