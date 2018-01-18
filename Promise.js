// reference
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

// *what is promise??
// A Promise is an object representing the eventual completion or failure of an asynchronous operation.
// Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.


//  *why use promise??
//  with old style js, using several async functions makes you hard to understand code,
//  , so promise came out



// *how to use?

function successCallback(result) {
  console.log("It succeeded with " + result);
}

function failureCallback(error) {
  console.log("It failed with " + error);
}

doSomething(successCallback, failureCallback);

// ex
let promise = doSomething();
promise.then(successCallback, failureCallback);
// simple ex
doSomething().then(successCallback, failureCallback);

// *advantage? chaining!
// old style
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

//  with new
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback); // .catch >> .then(null, failureCallback);

//  more new
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);

//  ex)
new Promise((resolve, reject) => {
    console.log('Initial');

    resolve();
})
.then(() => {
    throw new Error('Something failed');

    console.log('Do this');
})
.catch(() => {
    console.log('Do that');
})
.then(() => {
    console.log('Do this whatever happened before');
});

/* result
Initial
Do that
Do this whatever happened before

no do this cuz something failed error caused a rejection
*/
