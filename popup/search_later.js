let ddgLink = "https://duckduckgo.com/?q="

let queryField = document.querySelector('[name="query"]');

let submitBtn = document.querySelector('[name="addQuery"]');
submitBtn.addEventListener('click', addQuery);

let storageDisplay = document.querySelector('#data');

let queryArray = new Array(); //explicitly making this an array here is not specifically necessary, but helps with VS Code intellisense


initStorage();

function initStorage() {


    browser.storage.local.get("queryArray").then((result) => {
        
        if (typeof result.queryArray === "undefined")
        {
            console.log("need to init new storage");
            browser.storage.local.set({ queryArray });
        }
        else {
            queryArray = result.queryArray;
            console.log(`Returned from Storage: ${JSON.stringify(result)}`);
            displaySearchList(queryArray);
        }
    });
}

function displaySearchList(listArray) {
    storageDisplay.innerHTML = ""; //clear the display
    let fragment = document.createDocumentFragment(); //using this means only one dom reflow after adding elements rather than reflow for every single element. 
    //(because lets be real, if you have 300 open browser tabs, then having hundreds of pending searches listed here is really not *that* unlikely)

    for (const listItem of listArray) {
        anchor = storageDisplay.appendChild(document.createElement("a"));
        anchor.textContent = listItem;
        anchor.href = ddgLink + listItem;
        anchor.addEventListener('click', (e) => {
            removeQuery(listItem);
        });
        storageDisplay.appendChild(document.createElement("br"))//lazy line break
    }
}

function addQuery() {

    console.log(queryField.value);

    queryArray.push(queryField.value);


    console.log("Field value: " + JSON.stringify(queryField.value));
    console.log("Array value: " + JSON.stringify(queryArray));

    browser.storage.local.set({ queryArray });
    displaySearchList(queryArray);
    browser.storage.local.get("queryArray").then((result) => {

        console.log(`2nd Returned from Storage: ${JSON.stringify(result)}`);

    });

    queryField.value = "";
}

function removeQuery(toRemove){
    console.log("tried to remove: " + toRemove);
    let idx = queryArray.indexOf(toRemove);
    if (idx>-1){
        queryArray.splice(idx, 1);
    }
    browser.storage.local.set({ queryArray });
    displaySearchList(queryArray);
    
}