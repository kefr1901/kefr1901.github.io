let historyName;
let historyCompany;
let historyDate;
let historyEvent;
let historyTableArray = []

//var str = "Hello world!";
//var res = str.slice(0, 5);

// loading some random users to fill in the first 6 events and history

$.ajax({
  method: "GET",
  url: "https://5db6da6bf6869d001474a972.mockapi.io/api/crm/costumer"
})
  .done(function (data) {

   
    for (let i = 0; i < data.length; i++) {

      let oldDate = data[i].date; 
      let newDate = oldDate.slice(0,10); //slice the date for the right format
      

      historyName = data[i].name;
      historyCompany = data[i].Company;
      historyDate = newDate;
      historyEvent = data[i].Event;

      addHistoryToTableArray(historyName, historyCompany, historyDate, historyEvent);

      printHistory();

    }



  });


console.log();


function printHistory() { //Printing a table for every object in my array with random people

  $("#historyTbody").empty();
  for (let i = 0; i < historyTableArray.length; i++) {
    $("#historyTbody").append("<tr id='cID" + i + "' data-toggle='tooltip' data-placement='bottom' title=''>" + "<th scope='row'>" + (i+1) + "</th>" + "<td class='cName'>" + historyTableArray[i].name + "</td>" + "<td d-none d-lg-table-cell'>" + historyTableArray[i].company + "</td>" + "<td class='cMail d-none d-sm-table-cell'>" + historyTableArray[i].event + "</td>" + "<td class='cMail d-none d-sm-table-cell'>" + historyTableArray[i].date + "</td>" + "</tr>");
  }
 
}

function addHistoryToTableArray(name, Company, date, Event) { // Saving the people as an object and pushing it to my array
  let objectHistory = {
    name: name,
    company: Company,
    date: date,
    event: Event
  };

  historyTableArray.push(objectHistory);
}

function addDealToHistory() {

  // taking the value of input and giving it a variable

    let dealname = document.getElementById("deal_name").value;
    let dealcompany = document.getElementById("deal_company").value;
    let deal_deal = document.getElementById("deal_deal").value;
    let deal_date = document.getElementById("deal_date").value;

    //console.log(dealname + "" , dealcompany + deal_deal+ deal_date);


    if (dealname == "" || dealcompany == "" || deal_deal == "") { //checks if there is any empty fields

      $(".hidden").addClass("show").fadeIn( 300 ).delay( 1500 ).fadeOut( 400 ); //alerts the user 


    } else {

      let dealObject = {
        name: dealname,
        company: dealcompany,
        event: deal_deal,
        date: deal_date

      };

      historyTableArray.push(dealObject);// take the new object and pushing it to the array with api objects
      printHistory();//printing the new object 
      resetForm(); // call the function that resets the inputfields

    }

    console.log(historyTableArray);

}

function resetForm() { //resets all the input fields

  document.getElementById("myForm").reset();

}

