let queryField = document.querySelector('[name="query"]');

let submitBtn = document.querySelector('[name="addQuery"]');
submitBtn.addEventListener('click', addQuery);

let storageDisplay = document.querySelector('#storageoutput');


let queryArray = new Array();// DUMB IDIOT BITCH ITS PERSISTING JUST FINE UR JUST OVERWRITING IT
//have to get/check local storage and THEN set to blank array if it doesnt exist
browser.storage.local.set({queryArray});
browser.storage.local.get("queryArray").then((result) => {
    queryArray = result.queryArray;
    console.log(`Returned from Storage: ${JSON.stringify(result)}`);
});

function addQuery() {

    console.log(queryField.value);

    queryArray.push(queryField.value);

    
    console.log("Field value: " + JSON.stringify(queryField.value));
    console.log("Array value: " + JSON.stringify(queryArray));

    browser.storage.local.set({queryArray});
    browser.storage.local.get("queryArray").then((result) => {

    console.log(`2nd Returned from Storage: ${JSON.stringify(result)}`);
});
}