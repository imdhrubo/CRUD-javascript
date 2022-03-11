var touristData = [];
var index = 0;
var pictureSource = "";
var updatedIndex = 0;
var nextTouristSortingState = false;
var currentSortedState = false;
var searchByName = "";

function inputTouristData() {
  event.stopPropagation();
  event.preventDefault();
  var name = document.getElementById("nameInput").value;
  var address = document.getElementById("addressInput").value;
  var rating = document.getElementById("ratingInput").value;
  var type = document.getElementById("type").value;
  index++;
  var touristObject = {
    name: name,
    address: address,
    rating: rating,
    type: type,
    picture: pictureSource,
    id: index
  };
  var formArray = ["name", "address", "rating", "picture"];
  var validationValue = true;
  for (var i = 0; i < formArray.length; i++) {
    var currentField = document.getElementById(formArray[i] + "Input");

    validationValue = ValidateTheInput(
      currentField.name + "Input",
      currentField.name + "Error",
      currentField.name + "Div"
    );
    if (validationValue == false) break;
  }

  if (updatedIndex > 0) {
    for (var i = 0; i < touristData.length; i++) {
      if (touristData[i].id === updatedIndex) {
        touristData.splice(i, 1);
        break;
      }
    }
    updatedIndex = 0;
  }

  if (validationValue == true) {
    touristData.push(touristObject);
    touristData.sort(compareForSorting);
    resetTouristData();
    displayTouristData();
  }
}

function uploadTouristImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.addEventListener("load", function(e) {
      pictureSource = e.target.result;
    });
    reader.readAsDataURL(this.files[0]);
  }
}

function resetTouristData() {
  event.stopPropagation();
  event.preventDefault();
  document.getElementById("nameInput").value = "";
  document.getElementById("addressInput").value = "";
  document.getElementById("ratingInput").value = "";
  document.getElementById("type").selectedIndex = 0;
  document.getElementById("pictureInput").value = "";
}

function displayTouristData() {
  touristData.sort(compareForSorting);

  var table =
    "<table><tr> <th>Name</th> <th>Address</th> <th id=" +
    "touristRating" +
    " value=" +
    "Rating>Rating</th> <th>Type</th> <th>Image</th> <th>Action</th> </tr>";
  for (var i = 0; i < touristData.length; i++) {
    var searchKey = touristData[i].name.toLowerCase();
    if (!searchKey.startsWith(searchByName)) continue;
    table +=
      "<tr>" +
      "<td>" +
      touristData[i].name +
      "</td><td>" +
      touristData[i].address +
      "</td><td>" +
      touristData[i].rating +
      "</td><td>" +
      touristData[i].type +
      "</td><td>" +
      "<img src=" +
      touristData[i].picture +
      " height=100px>" +
      "</td><td>" +
      "<button type=" +
      "button" +
      " class=" +
      "updateButton" +
      " id=" +
      "updateTourist" +
      " updateTourist=" +
      touristData[i].id +
      ">Update</button>" +
      "<button type=" +
      "button" +
      " class=" +
      "deleteButton" +
      " id=" +
      "deleteTheTourist" +
      " deleteTourist=" +
      touristData[i].id +
      ">Delete</button>" +
      "</td></tr>";
  }
  table += "</table>";
  document.getElementById("dataTable").innerHTML = table;

  var holdTheUpdatingIndex;
  var holdTourist = document.getElementsByClassName("updateButton");
  for (var i = 0; i < holdTourist.length; i++) {
    holdTourist[i].onclick = function() {
      holdTheUpdatingIndex = this.getAttribute("updateTourist");
      updateTouristData(holdTheUpdatingIndex);
    };
  }

  var holdTheDeletingIndex;
  var holdTouristToDelete = document.getElementsByClassName("deleteButton");
  for (var i = 0; i < holdTouristToDelete.length; i++) {
    holdTouristToDelete[i].onclick = function() {
      holdTheDeletingIndex = this.getAttribute("deleteTourist");
      removeTouristData(holdTheDeletingIndex);
    };
  }

  document.getElementById("touristRating").onclick = function() {
    currentSortedState = !currentSortedState;
    displayTouristData();
  };
}

function searchTourist() {
  var inputTouristName = document.getElementById("searchName");
  searchByName = inputTouristName.value.toLowerCase();
  displayTouristData();
}

function removeTouristData(c) {
  var parseTheIndex = parseInt(c);
  var x = confirm("Do you want to delete?");
  if (x == false) return;
  for (var i = 0; i < touristData.length; i++) {
    if (touristData[i].id === parseTheIndex) {
      touristData.splice(i, 1);
      break;
    }
  }
  displayTouristData();
}

function updateTouristData(c) {
  var parseTheIndex = parseInt(c);
  var updatedTouristData;
  for (var i = 0; i < touristData.length; i++) {
    if (touristData[i].id === parseTheIndex) {
      updatedTouristData = touristData[i];
      updatedIndex = parseTheIndex;
    }
  }
  document.getElementById("nameInput").value = updatedTouristData.name;
  document.getElementById("addressInput").value = updatedTouristData.address;
  document.getElementById("ratingInput").value = updatedTouristData.rating;
  document.getElementById("type").value = updatedTouristData.type;
}

function compareForSorting(a, b) {
  if (parseInt(a.rating) < parseInt(b.rating)) {
    return currentSortedState ? 1 : -1;
  }
  if (parseInt(a.rating) > parseInt(b.rating)) {
    return currentSortedState ? -1 : 1;
  }
}

function ValidateTheInput(input, error, alertDiv) {
  if (input != "ratingInput" && error != "ratingError" && alertDiv != "RatingDiv") {
    var field = document.getElementById(input);
    var error = document.getElementById(error);
    if (field.value == "") {
      field.style.border = "1px solid red";
      document.getElementById(alertDiv).style.color = "red";
      error.textContent = "Required";
      field.focus();
      return false;
    } else {
      return true;
    }
  } else if (
    input === "ratingInput" &&
    error === "ratingError" &&
    alertDiv === "ratingDiv"
  ) {
    var field = document.getElementById(input);
    var error = document.getElementById(error);
    if (field.value == "" || field.value < 1 || field.value > 10) {
      field.style.border = "1px solid red";
      document.getElementById(div).style.color = "red";
      error.textContent = "Accepted rating Required";
      field.focus();
      return false;
    } else {
      return true;
    }
  }
}

function verify(input, error, alertDiv) {
  var field = document.getElementById(input);
  var error = document.getElementById(error);
  if (field.value != "") {
    field.style.border = "1px solid #5e6e66";
    document.getElementById(alertDiv).style.color = "black";
    error.innerHTML = "";
  }
}

window.onload = function(e) {
  var formArray = ["name", "address", "rating", "picture"];
  for (var i = 0; i < formArray.length; i++) {
    document.getElementById(formArray[i] + "Input").addEventListener(
      "blur",
      function() {
        verify(this.name + "Input", this.name + "Error", this.name + "Div");
      },
      true
    );
  }

  document
    .getElementById("pictureInput")
    .addEventListener("change", uploadTouristImage);
  document.getElementById("submit").onclick = function() {
    inputTouristData();
  };
  document.getElementById("reset").onclick = function() {
    resetTouristData();
  };
  document
    .getElementById("searchName")
    .addEventListener("keyup", searchTourist);
};
