(function() {
  var userInput = "";
  var addButton = document.querySelector("button");
  var toDoList = document.querySelector(".to-do-list");
  var dropdown = document.querySelector(".dropdown");
  var userInputField = document.querySelector("#input");
  var count = 0;
  var counter = document.querySelector(".counter");
  var filters = document.querySelector("#filters");
  var bottomCon = document.querySelector("#bottom-container");
  var clearBtn = document.querySelector("#clear");

  //*********************************************************
  //                      EVENT LISTENERS
  //*********************************************************

  //Event listener for the mark all done button left of input field
  dropdown.addEventListener("click", function(e) {
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    let checkboxesChecked = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    // Loop over all checkoxes in to-do-list
    for (i = 0; i < checkboxes.length; i++) {
      // set all unchecked checkboxes to checked
      if (!checkboxes[i].checked) {
        checkboxes[i].checked = true;
        count--;
        updateCount();
      }
      //unchecks to do items in the list, when all items are marked as done
      else if (checkboxes.length == checkboxesChecked.length) {
        checkboxes[i].checked = false;
        count++;
        updateCount();
      }
    }
  });
  //Event Listener to edit items in the to do list
  toDoList.addEventListener("dblclick", function(e) {
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
    e.target.addEventListener("keydown", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.target.setAttribute("contenteditable", "false");
      }
    });
  });
  // Event Listener for mobile longpress to edit items in list

  // Create variable for setTimeout
  let timer;
  // number of milliseconds for longpress
  let longpress = 1000;

  toDoList.addEventListener(
    "touchstart",
    function(e) {
      var selectedToDo = e.target;
      timer = setTimeout(check, longpress);

      function check() {
        console.log("you are pressing long");
        e.target.setAttribute("contenteditable", "true");
        e.target.focus();
        e.target.addEventListener("keydown", function(e) {
          if (e.keyCode === 13 || e.which === 13) {
            e.target.setAttribute("contenteditable", "false");
            clearTimeout(timer);
          }
        });
      }
    },
    true
  );

  toDoList.addEventListener("touchend", function(e) {
    // On touchend timer is reset
    clearTimeout(timer);
  });

  // Event listener for filter selection at the bottom of to do list
  filters.addEventListener("click", function(e) {
    if (e.target != filters) {
      if (!e.target.classList.contains("active")) {
        let currActive = document.querySelector(".active");
        currActive.classList.remove("active");
        e.target.classList.add("active");
      }
      // show all to dos
      if (e.target.textContent === "All") {
        showAlltoDos();
      }
      //show active to dos and hide completed
      else if (e.target.textContent === "Active") {
        showAlltoDos();
        let checkboxes = document.querySelectorAll(
          "input[type=checkbox]:checked"
        );
        for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].parentNode.classList.add("hide");
        }
      }
      // show all completed to dos and hide active ones
      else {
        showAlltoDos();
        let checkboxesAll = document.querySelectorAll("input[type=checkbox]");
        for (let i = 0; i < checkboxesAll.length; i++) {
          if (checkboxesAll[i].checked === false) {
            checkboxesAll[i].parentNode.classList.add("hide");
          }
        }
      }
    }
  });

  //Event listener to clear completed items in the to do list
  clearBtn.addEventListener("click", function(e) {
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    //loop over all checked checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
      let parent = checkboxes[i].parentNode.parentNode;
      toDoItem = checkboxes[i].parentNode;
      parent.removeChild(toDoItem);
    }
    clearBtn.classList.remove("show");
  });

  //Event listener to remove items when the x is clicked and check items off the list
  toDoList.addEventListener("click", function(e) {
    let path = e.composedPath();
    let toDoItem = path[1];
    let toDoList = path[2];
    //check if click happens on delete x on an already checked off item counter needs to remain as is
    if (
      e.target.classList.contains("x") &&
      e.target.parentNode.childNodes[0].checked
    ) {
      toDoList.removeChild(toDoItem);
    }
    // check if click happens on delete x on a not checked off item, set counter -1
    else if (
      e.target.classList.contains("x") &&
      !e.target.parentNode.childNodes[0].checked
    ) {
      toDoList.removeChild(toDoItem);
      count--;
    }
    //check if click happens on a checkbox that has not been ticked off, set counter -1 and check box
    else if (e.target.type === "checkbox" && e.target.checked) {
      count--;
      clearBtn.classList.add("show");
    }
    // check if click happens on a checkbox already ticket off, set
    // counter +1 as is again marked as active
    else if (e.target.type === "checkbox" && !e.target.checked) {
      count++;
    }
    updateCount(count);
    checkNumToDos();
  });

  //
  userInputField.addEventListener("keydown", function(e) {
    if (e.keyCode === 13 || e.which === 13) {
      addItemToList();
    } else if (e.keyCode === 40 || e.which === 40) {
      console.log("you want to go down");
      //write functionality for what to fo on arrow key down
    } else if (e.keyCode === 38 || e.which === 38) {
      console.log("you want to go up");
      //write functionality for what to fo on arrow key up
    }
  });
  //*********************************************************
  //                      FUNCTIONS
  //*********************************************************

  function getUserInput() {
    userInput = document.querySelector("input").value;
    document.querySelector("input").value = "";
    return userInput;
  }

  function addItemToList() {
    getUserInput();
    //create divs for new input, user text input and set all needed classes
    var divToDoContainer = document.createElement("div");
    divToDoContainer.setAttribute("class", "to-do-container");
    var divBtn = document.createElement("input");
    var divTxt = document.createElement("div");
    var divX = document.createElement("div");
    divBtn.setAttribute("type", "checkbox");
    divBtn.setAttribute("class", "check");
    divTxt.textContent = userInput;
    divTxt.setAttribute("class", "to-do");
    divX.setAttribute("class", "x");
    divX.textContent = "X";
    document.body.appendChild(divBtn);
    toDoList.appendChild(divToDoContainer);
    divToDoContainer.appendChild(divBtn);
    divToDoContainer.appendChild(divTxt);
    divToDoContainer.appendChild(divX);
    count++;

    //change active class in filters to All
    let allFilters = document.querySelectorAll("#filters>div");
    for (let i = 0; i < allFilters.length; i++) {
      allFilters[i].classList.remove("active");
      console.log(allFilters[i]);
      if (allFilters[i].textContent === "All") {
        allFilters[i].classList.add("active");
      }
    }
    // show all to dos as filter has been reset to All
    showAlltoDos();
    // update counter
    updateCount(count);
    checkNumToDos();
  }
  // sets the counter bottom left to reflect the current state of count
  function updateCount(currCount) {
    counter.textContent = `${count} Items in List`;
  }

  // show all to dos in the list
  function showAlltoDos() {
    var toDos = document.querySelectorAll(".to-do-container");
    for (var i = 0; i < toDos.length; i++) {
      toDos[i].classList.remove("hide");
    }
  }

  // hide and show bottom menu filters based on the number of to dos in list
  function checkNumToDos() {
    let numChildNodes = document.querySelector(".to-do-list").childNodes.length;
    if (numChildNodes === 0) {
      bottomCon.classList.add("hide");
      dropdown.classList.remove("show");
    } else {
      bottomCon.classList.remove("hide");
      dropdown.classList.add("show");
    }
  }
})(); // end of IIFE
