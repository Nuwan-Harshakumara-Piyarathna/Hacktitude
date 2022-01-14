# Asynchronous JavaScript


## AJAX

Stands for Asynchronous Javascript and XML
The use of XMLHTTPRequest to communicate with the servers
Sends information in
- XML
- HTML
- Text
- JSON

AJAX a web development technique

Async => Can update webpage without refreshing 

Ex:- twitter notification numbers

xhr - XMLHRRPRequest


## ASYNC vs SYNC

Javascript runs top to bottom 

```js script
function actionOne(){
    console.log('Im the first action!')
}

function actionTwo(){
    console.log('Im the second action!')
}

function actionThree(){
    console.log('Im the thirs action!')
}

actionOne()
actionTwo()
actionThree()
```

console log output


```
>>Im the first action!
>>Im the second action!
>>Im the third action!
```

Javasctipt is single threaded

Which means only one thing can happen at a time



```js script

let response = fetch(';image.png') //fetch is asynchronous

let image = response.data()

```

Have to wait for fetch to execute or else error

[async.png]



