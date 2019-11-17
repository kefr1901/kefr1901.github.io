const addButton = $("#addContactButton");
const customerNameSelect = $("#customerNameInput");
const phoneSelect = $("#customerPhoneInput");
const emailSelect = $("#customerEmailInput");
const additionalSelect = $("#customerAdditionalInput");
const tbodySelect = $("#customerTbody");

let customerTableArray = [];
let customerName;
let phone;
let email;
let additional;
let info;
let dummyCustomer = 20;

/**
 * Gets some random customer from the randomuser api 
 * too fill in the customer list at the begining
 */
$.ajax({
    url: "https://randomuser.me/api?results=" + dummyCustomer + "",
    dataType: 'json',
    success: function (data) {
        for (let i = 0; i < data.results.length; i++) {
            customerName = data.results[i].name.first + " " + data.results[i].name.last
            phone = data.results[i].phone
            email = data.results[i].email
            additional = "this is a fake contact"
            addCustomerToTableArray(customerName, phone, email, additional);
            printCustomerToTable();
        }
    }
});

/**
 * Event listner for adding a customer to tha table
 * checks to make sure you have filled in all the fields
 */
addButton.on("click", function () {
    let i = 0;
    $(".customerInput").each(function (index, element) {
        if (element.value !== "") {
            i++;
        }
    });
    if (i !== 4) {
        alert("Please fill in all the fields");
    } else {
        customerName = customerNameSelect.val();
        phone = phoneSelect.val();
        email = emailSelect.val();
        additional = additionalSelect.val();

        //Add the customer data to an array and then prints it out on the table
        addCustomerToTableArray(customerName, phone, email, additional);
        printCustomerToTable();

        //hides the add customer and resets the input fields
        $("#addNewContactWindow").modal("hide");
        customerNameSelect.val("");
        phoneSelect.val("");
        emailSelect.val("");
        additionalSelect.val("");
    }
});

/**
 * stores the customer in an object thats is then pushed in to an array
 */
function addCustomerToTableArray(fullname, phone, email, additional) {
    let objC = {
        name: fullname,
        phoneNr: phone,
        mail: email,
        information: additional
    };
    customerTableArray.push(objC);
}

/**
 * Refresh the table and prints out all the customers that is stored in the array
 */
function printCustomerToTable(name, phone, email) {
    // $("#customerTbody").append("<tr id='cID" + (customerTableArray.length) + "'>" + "<th scope='row'>" + (customerTableArray.length) + "</th>" + "<td class='cName'>" + name +"</td>" + "<td class='cPhone'>" + phone +"</td>" + "<td class='cMail'>" + email +"</td>" + "</tr>");
    $("#customerTbody").empty();
    for (let i = 0; i < customerTableArray.length; i++) {
        $("#customerTbody").append("<tr id='cID" + i + "'>" + "<th scope='row'>" + (i+1) + "<img src='../images/edit.png' style='width: 25px; margin-left: 10px;' data-toggle='tooltip' data-placement='bottom' title='Click for more information'></img>" + "</th>" + "<td class='cName'>"  + customerTableArray[i].name + "</td>" + "<td class='cPhone d-none d-lg-table-cell'>" + customerTableArray[i].phoneNr + "</td>" + "<td class='cMail d-none d-sm-table-cell'>" + customerTableArray[i].mail + "</td>" + "</tr>");
    }
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
    });
}

//Click/selected customer
$("#customerTbody").on("click", "tr", function () {
    // brings up the modal window for editing and removing customers
    $(this).attr("data-toggle", "modal");
    $(this).attr("data-target", "#editNewContactWindow");
    $(this).attr("data-picked", "true");
    //takes the table values and puts them in the input fields for edditing
    $("#customerNameVal").val($(this).children(".cName").text());
    $("#customerPhoneVal").val($(this).children(".cPhone").text());
    $("#customerEmailVal").val($(this).children(".cMail").text());

    /**
     * because additional information is not displayed in the table 
     * We need to get it from the customerTableArray by looking for 
     * it in the array and picking the right one with the same name phonr and email
     */
    info = $.grep(customerTableArray, function (e) {
        return e.name == $("#customerNameVal").val();
    });
    $("#customerAdditionalVal").val(info[0].information);
});

// Remove selected contact
$("#removeContactButton").on("click", function () {
    //Ask again to confirm that you want to delete the customer
    if (confirm("Are you sure you want to remove this customer?")) {
        // loops thought the array to find the right customer and removes him from the array
        for (var i = 0; i < customerTableArray.length; i++) {
            if (customerTableArray[i].name == info[0].name && customerTableArray[i].phoneNr == info[0].phoneNr && customerTableArray[i].mail == info[0].mail && customerTableArray[i].information == info[0].information) {
                console.log(customerTableArray[i].name);
                console.log(info[0].name);
                customerTableArray.splice(i, 1);
                break;
            }
        }
        info = "";
        // Refresh the table
        printCustomerToTable();

        $(this).attr("data-dismiss", "modal");
        $("tr[data-picked='true']").remove();
    }
});

// edit customer and also checks so that none of the fields are empty
$("#editContactButton").on("click", function () {
    let j = 0;
    $(".customerEditInput").each(function (index, element) {
        if (element.value !== "") {
            j++;
        }
    });
    if (j !== 4) {
        alert("Please fill in all the fields");
    } else {
        // loops thought the array finds the right customer and replace the old object with a new edit customer
        for (var i = 0; i < customerTableArray.length; i++) {
            if (customerTableArray[i].name == info[0].name && customerTableArray[i].phoneNr == info[0].phoneNr && customerTableArray[i].mail == info[0].mail && customerTableArray[i].information == info[0].information) {
                let tmp = {
                    name: $("#customerNameVal").val(),
                    phoneNr: $("#customerPhoneVal").val(),
                    mail: $("#customerEmailVal").val(),
                    information: $("#customerAdditionalVal").val()
                };
                customerTableArray.splice(i, 1, tmp);
                break;
            }
        }
        info = "";
        // Refresh the table
        printCustomerToTable();
        // hides the edit modal and deselect the customer
        $(this).attr("data-dismiss", "modal");
        $("tr[data-picked='true']").attr("data-picked", "false")
    }
});


