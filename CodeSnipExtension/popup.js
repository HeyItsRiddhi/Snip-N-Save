/* Generate the DOM  for the extension's popup to display code snippets from current tab 
and buttons to copy and save snippets. THis function accepts one parameter a string array
contain the html of all code snippets on the page */
var db;

window.addEventListener('DOMContentLoaded', function () {

  //query the open browser tabs for the current window that the user is on
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    //send a request to the content script to retrieve snippets from website on current tab
    chrome.tabs.sendMessage(
        //send current tab address in request message to content script
        tabs[0].id,
        {from: 'popup', subject: 'snipInfo'},
        //upon recieving a response call setDOMInfo to display copyable/savable code snippets
        setDOM);
  });

  //instantiate a clipboard for every copy button in the extension's popup
  new Clipboard('.btn'); 
});

/*This function will take all the code snippets found on the page and display them with copy/save functionality
in popup*/
function setDOM(info) {

  //Validate that code snippets exist on page
  if (info.length > 0) {
    //if code snippets exist display them in popup
    for (var i = 0; i < info.length; i++){

      //grab container div to place code snippets in
      var element = document.getElementById("pageSnips");

      //create div for a snippet in popup
      var newSnip = document.createElement("div");
      newSnip.setAttribute("id", "snip" + i);
      element.appendChild(newSnip);

      // create copy button for code snippet
      var copyBtn = document.createElement('button');
      copyBtn.className ="btn";
      copyBtn.setAttribute("data-clipboard-target", "#snip"+i);
      var node = document.createElement("img");
      node.setAttribute("src", "copy.png" );
      copyBtn.appendChild(node);
      newSnip.appendChild(copyBtn);

      //create save button for code snippet
      var saveBtn = document.createElement('button');
      saveBtn.className ="save";
      var btn_img = document.createElement("img");
      btn_img.setAttribute("src", "save.png" );
      saveBtn.appendChild(btn_img);
      newSnip.appendChild(saveBtn);

      //input box to title to code snippet
      var saveTitleBox = document.createElement("input");
      saveTitleBox.className = "snipTitle";
      newSnip.appendChild(saveTitleBox);

      //inject snippet info into div created
      document.getElementById('snip' + i).innerHTML += info[i];
    }
  }

  //if save button is click save snippet to database.
  add_snip(); 

  //if search button is clicked search database for code snip
  document.getElementById("searchBtn").onclick = function (){
    search_snip();
  }
}

// This function will save the code snippet clicked on with given title to the Web Database
function add_snip(){
    //instantiate dexie database
    db = new Dexie('snips');

    //define the database structure
    db.version(1).stores({
      snippets: 'title,snip'
    });

    //Get all save buttons
    var buttons = document.getElementsByClassName("save");
    var buttonsCount = buttons.length;

    //If a save button is clicked...
    for (var i = 0; i < buttonsCount; i ++) {
      buttons[i].onclick= function() {

        //get the box containing the code snippet and associated buttons/fields
        var saveSnip = document.getElementById(this.parentNode.id);

        //get the code snippet via "pre" tag
        var code = saveSnip.lastChild.outerHTML;

        //get the title entered in input box
        var title = this.nextSibling.value;

        //If the user enters no title don't save and notify the user
        if(title == "" && document.getElementById('noTitle') == null) {

          //output error message for no title entered beside input box 
          var noTitle = document.createElement("div");
          noTitle.setAttribute('id','noTitle');
          saveSnip.insertBefore(noTitle,saveSnip.lastChild);
          noTitle.innerHTML="Please enter a title!"

        } else {
          //if title is entered save snippets to database
          db.snippets.put({title:title,snip:code}).catch (
          function(error) {
            console.log("There was an error" + error);
          })
        }

        //clear input box once snippet saved
        this.nextSibling.value = "";
    }
  }
}

// This function will search the daabse for code snippets associated with title entered. 
function search_snip() {
    //grab container div to place search result snippets in
    var element = document.getElementById("searchSnip");

    //clear previous results
    element.innerHTML = "";

    //clears existing code snippets
    document.getElementById('pageSnips').style.display = 'none';

    //display search result snippet
    var key = document.getElementById('search').value;

    db.snippets.get(key).then(function(item){
      //create div for snippet in popup
      var newSnip = document.createElement("div");
      newSnip.setAttribute("id", "snipResult");
      element.appendChild(newSnip);

      // create copy button for code snippet
      var copyBtn = document.createElement('button');
      copyBtn.className ="btn";
      copyBtn.setAttribute("data-clipboard-target", "#snipResult");
      var node = document.createElement("img");
      node.setAttribute("src", "copy.png" );
      copyBtn.appendChild(node);
      newSnip.appendChild(copyBtn)

      //inject snippet into div created above
      document.getElementById('snipResult').innerHTML += item.snip;
    }).catch(function (error) {
      //error message if no search result 
      element.innerHTML = "No code snippets found for \"" + key 
      + "\"";
    });

}