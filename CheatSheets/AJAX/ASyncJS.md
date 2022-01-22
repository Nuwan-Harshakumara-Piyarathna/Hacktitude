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

Javascript is single threaded

Which means only one thing can happen at a time



```js script

let response = fetch(';image.png') //fetch is asynchronous

let image = response.data()

```

Have to wait for fetch to execute or else error

[async.png]


to mitigate can use 
- callbacks (older)
- promises (newer)

## Using callbacks

```js script

function showImage(url,type,callback){
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = type

    xhr.onload = function(){
        callback(xhr.response)
    }
    xhr.send()
}

function createImage(blob){
    const objectURL = URL.createObjectURL(blob)
    const imageElement = documnet.createElement('img')
    imageElement.src = objectURL
    document.body.appendChild(imageElement)
}

showImage('apple.jpg','blob',createImage)

```


## Using Promises

fetch() api calls returns a promise object

we use .then statements for this behaviour.

```js script

fetch('https://restcountries.eu/rest/v2/all')
    .then(response => {
        return response.json()
    }).then(json => {
        console.log(json)
    }).catch(err => {
        console.log('errors: ' + err.message)
    })

```




- specifially made for async operations
- can chain operations usign '.then'
- placed in an event queue
- better error handling '.catch'
- avoid inversion control than callbacks

## ASYNC AWAIT

async keyword added to function to signify that it returns  a promise rather than a value.

Using await keyword inside the function stops from assigning a value to a variable until fetch() is executed.




```js script

async function getData(){
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await response.json()
    return data
}

getData().then(data=> console.log(data))
    .catch(err => console.log('errors: ' + err.message))

```