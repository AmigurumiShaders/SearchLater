//set up variables
// let searchListObject = {searchList:{}};

/* generic error handler */
function onError(error) {
    console.log(error);
}


function addSearchTerm(search)
{
    // if(!searchListObject)
    // {
    //     debugger;
    //     searchListObject = {searchList:{}};
    // }
    let searchListArray = {searchList:[]};

    searchListArray = getSearchList();

    searchListArray.push(search);

    let storingSearchTerm = browser.storage.local.set(searchListArray);


}

function getSearchList()
{
    
    let gettingSearchTermList = browser.storage.local.get("searchList"); //this returns a PROMISE or something, not the actual data. some async stuff idk i dont know js
    console.log(gettingSearchTermList);
    gettingSearchTermList.then((results) => {
        let searchListObject = results;
        let dataSpot = document.querySelector("#data");
        let listObjKeys = Object.keys(results["searchList"]);
        dataSpot.innerHTML = "";
        for (const key of listObjKeys) {
            dataSpot.innerHTML += key + "\n";

        }
        debugger;
        console.log(results);

    }, onError);
    return searchListObject;
}
