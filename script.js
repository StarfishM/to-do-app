(function() {
  //
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

  dropdown.addEventListener("click", function(e) {
    // console.log(e);
    // console.log("you clicked the tick off all tasks button");
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    let checkboxesChecked = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    // console.log(checkboxes.length == checkboxes.checked.length);
    for (i = 0; i < checkboxes.length; i++) {
      // console.log(checkboxes.length == checkboxesChecked.length);
      if (!checkboxes[i].checked) {
        // console.log("unchecked chekbox");
        checkboxes[i].checked = true;
        count--;
        updateCount();
      } else if (checkboxes.length == checkboxesChecked.length) {
        checkboxes[i].checked = false;
        count++;
        updateCount();
      }
    }
  });

  toDoList.addEventListener("dblclick", function(e) {
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
    e.target.addEventListener("keydown", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.target.setAttribute("contenteditable", "false");
      }
    });
  });

  // Create variable for setTimeout
  let timer;

  // Set number of milliseconds for longpress
  let longpress = 1000;

  // let listItems = document.getElementsByClassName("to-do");

  toDoList.addEventListener(
    "touchstart",
    function(e) {
      // var _this = this;
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
    // On mouse up, we know it is no longer a longpress
    clearTimeout(timer);
    // e.target.setAttribute("contenteditable", "false");
  });

  // toDoList.addEventListener("mouseout", function(e) {
  //   clearTimeout(timer);
  //   // e.target.setAttribute("contenteditable", "false");
  // });

  filters.addEventListener("click", function(e) {
    if (e.target != filters) {
      if (!e.target.classList.contains("active")) {
        let currActive = document.querySelector(".active");
        currActive.classList.remove("active");
        e.target.classList.add("active");
      }
      if (e.target.textContent === "All") {
        showAlltoDos();
        // console.log("you want all list elements");
        // var toDos = document.querySelectorAll(".to-do-container");
        // for (var i = 0; i < toDos.length; i++) {
        //   console.log(toDos[i]);
        //   toDos[i].classList.remove("hide");
        // }
      } else if (e.target.textContent === "Active") {
        console.log("you want active list elems");
        // console.log(
        //   document.querySelectorAll('input[type="checkbox"]:checked:after')
        // );
        // var array = []
        showAlltoDos();
        let checkboxes = document.querySelectorAll(
          "input[type=checkbox]:checked"
        );

        for (let i = 0; i < checkboxes.length; i++) {
          // console.log(checkboxes[i].parentNode.classList);
          checkboxes[i].parentNode.classList.add("hide");
        }
      } else {
        // console.log("yu want completew list elems");
        showAlltoDos();
        let checkboxesAll = document.querySelectorAll("input[type=checkbox]");
        for (let i = 0; i < checkboxesAll.length; i++) {
          // console.log(checkboxesAll[i].checked);
          if (checkboxesAll[i].checked === false) {
            checkboxesAll[i].parentNode.classList.add("hide");
            // console.log(checkboxesAll[i]);
          }
        }
      }
    }
  });

  clearBtn.addEventListener("click", function(e) {
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

    for (let i = 0; i < checkboxes.length; i++) {
      let parent = checkboxes[i].parentNode.parentNode;
      toDoItem = checkboxes[i].parentNode;
      parent.removeChild(toDoItem);
    }
    clearBtn.classList.remove("show");
  });

  toDoList.addEventListener("click", function(e) {
    // console.log();
    //check if click happens on delete x on an already checked off item
    let path = e.composedPath();
    let toDoItem = path[1];
    let toDoList = path[2];
    // if (e.path) {
    //   // do what works in chrome
    // } else if (e.composedPath && e.composedPath()) {
    //   console.log(e);
    // let path = e.composedPath();
    // let toDoItem = path[1];
    // console.log(toDoItem);
    // let toDoList = path[2];
    // console.log(toDoList);
    // toDoList.removeChild(toDoItem);
    // console.log(e.composedPath(e.composedPath[1]));
    // }
    if (
      e.target.classList.contains("x") &&
      e.target.parentNode.childNodes[0].checked
    ) {
      console.log(e);
      // toDoList = e.path[1].parentNode;
      // toDoItem = e.path[1];
      // let path = e.composedPath();
      // let toDoItem = path[1];
      // console.log(toDoItem);
      // let toDoList = path[2];
      // console.log(toDoList);
      toDoList.removeChild(toDoItem);
      console.log(" you want to delete an already checked off item");
      //check if click happens on delete x on a not checked off item, set counter -1
    } else if (
      e.target.classList.contains("x") &&
      !e.target.parentNode.childNodes[0].checked
    ) {
      console.log(e.composedPath());
      // toDoList = e.path[1].parentNode || (e.composedPath && e.composedPath());
      // toDoItem = e.path[1];
      // let path = e.composedPath();
      // let toDoItem = path[1];
      // console.log(toDoItem);
      // let toDoList = path[2];
      // console.log(toDoList);
      toDoList.removeChild(toDoItem);
      // console.log(e);
      count--;
    }
    //check if click happens on a checkbox that has not been ticked off, set counter -1
    else if (e.target.type === "checkbox" && e.target.checked) {
      console.log("you checked a box");
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

  userInputField.addEventListener("keydown", function(e) {
    // console.log(e);
    if (e.keyCode === 13 || e.which === 13) {
      addItemToList();
    } else if (e.keyCode === 40 || e.which === 40) {
      console.log("you want to go down");
    } else if (e.keyCode === 38 || e.which === 38) {
      console.log("you want to go up");
    }
  });

  //FUNCTIONS
  function getUserInput() {
    userInput = document.querySelector("input").value;
    document.querySelector("input").value = "";
    // console.log(userInput);
    return userInput;
  }

  function addItemToList() {
    getUserInput();
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
    updateCount(count);
    checkNumToDos();
    // console.log(count);
  }

  function updateCount(currCount) {
    counter.textContent = `${count} Items in List`;
  }

  function showAlltoDos() {
    var toDos = document.querySelectorAll(".to-do-container");
    for (var i = 0; i < toDos.length; i++) {
      toDos[i].classList.remove("hide");
    }
  }

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

//# JS snippet for email notification settings, e. g. Twitter
//cb=document.querySelectorAll('input[type="checkbox"]');for(i in cb){cb[i].checked=false}
