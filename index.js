  var config = {
    apiKey: "AIzaSyD72YWPy0brZO8ebaVDeCmLeATl7Udfeno",
    authDomain: "nabanita-shop.firebaseapp.com",
    databaseURL: "https://nabanita-shop.firebaseio.com",
    projectId: "nabanita-shop",
    storageBucket: "nabanita-shop.appspot.com",
    messagingSenderId: "606902417903"
  };
firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref('customerInfo');
var totalShipmentNo;


function enterToLogIn(){
  var input = document.getElementById("password_field");
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    document.getElementById("logInButton").click();
  }
});
}

function searchOnEnter(){
  var input = document.getElementById("phoneNumber");
  input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    document.getElementById("searchButton").click();
  }
});

}

function shipmentConferm(){
  var pass=document.getElementById("adminPassword").value;
  if(pass=="confirm"){
    document.getElementById("adminPassword").value="";
    var totalShipmentref= firebase.database().ref('shipmentCount');
    totalShipmentref.once("value", function(snapshot){
      var shipmentNO = snapshot.val();
      if(shipmentNO==null){
        console.log("totalShipment NULL:" + totalShipmentNo);
        var data={
          Number: 1
        }
        totalShipmentref.push(data);
      }
      var key = Object.keys(shipmentNO);
      var k=key[0];
      totalShipmentNo = shipmentNO[k].Number + 1;
      var updatedData ={
        Number: totalShipmentNo
      }
      totalShipmentref.child(k).update(updatedData);
      //console.log("totalShipment No:" + totalShipmentNo);
      window.location= "shipmentlist.html";
  });
  }
  else
  {
    window.alert("Wrong Password !!");
    document.getElementById("adminPassword").value="";
  }
}

function shipmentSelect()
{
  getShipmentNo(function(){
    console.log("totalShipme : " + totalShipmentNo);
    var myDiv = document.getElementById("optionSelect");
    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    selectList.onchange = function(){
      var selector= document.getElementById("mySelect").value;
      console.log("select as: "+selector);
      createTableWithShipmentNo(selector);
    }
    myDiv.appendChild(selectList);
    for (var i = 1; i <= totalShipmentNo; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.text = "Shipment "+i;
      selectList.appendChild(option);
    }
    selectList.value= totalShipmentNo;
    var selector= document.getElementById("mySelect").value;
    //console.log("select as: "+selector);
    createTableWithShipmentNo(selector);
   });
}



function delete_table(no)
{
  var tableHeaderRowCount = 2;
  var table = document.getElementById('data_table');
  var rowCount = table.rows.length;
  console.log("Table row count: " +rowCount);
  if(rowCount>2)
  {
    for (var i = tableHeaderRowCount; i < rowCount; i++) 
    {
      table.deleteRow(tableHeaderRowCount);
    }
  }
}




function createTableWithShipmentNo(no)
{
  //console.log("work");
  delete_table(no);
  var reference = firebase.database().ref(no);
  reference.once("value", function(snapshot) 
  {
    console.log(snapshot.val());
    var shipmentPhone = snapshot.val();
    if(shipmentPhone!=null)
    {
      var shipmentKeys = Object.keys(shipmentPhone);
      for(var j=0;j < shipmentKeys.length; j++)
      {
        var ko =shipmentKeys[j];
        var dataBasePhoneNumber = shipmentPhone[ko].phone;
        var databaseProduct = shipmentPhone[ko].product;
        var delivaryStatus = shipmentPhone[ko].delivaryStatus;
        console.log("dataBasePhoneNumber" + dataBasePhoneNumber);
        ggggg(dataBasePhoneNumber,databaseProduct,delivaryStatus);
      }
    }
  });
}

// function delivaryStatusChange(){
// 	console.log("status change");
// 	//alert($(this).parents('tr').text());
// }

function getRowNo(no,phoneNumber,Dstatus) {
        
       // var selectValue = document.getElementById("delivarySelect").value;
       // console.log("row: "+no +" Phone: "+phoneNumber );
        

   var delivered= {
  	delivaryStatus: 1
  };
  var notDelivered= {
  	delivaryStatus: 0
  };

  var reff = firebase.database().ref(totalShipmentNo);
  reff.once("value", function(snapshot) 
  {
   var shipment = snapshot.val();
   if(shipment != null)
   {
      var keys = Object.keys(shipment);
      var currPhoneNumber = phoneNumber;
      for(var i=0;i < keys.length; i++)
      {
        var k =keys[i];
        var dataBasePhoneNumber = shipment[k].phone;
        if(dataBasePhoneNumber == currPhoneNumber)
          {
            //console.log("phone Number matched");
            if(Dstatus==0){
            reff.child(k).update(delivered);
        	}
            else {
            	reff.child(k).update(notDelivered);
            }
          }
      }
    }
  }, function (error) 
   {
    console.log("Error: " + error.code);
   });

 }


function ggggg(phone,Dproduct,Dstatus)
{
	//var selectList = document.getElementById("delivarySelect");
	//selectList.value=1;
    var ref = firebase.database().ref("customerInfo/");
    ref.once("value", function(snapshot) 
        {
         //console.log(snapshot.val());
         var customerInfo = snapshot.val();
         if(customerInfo != null)
         {
            var keys = Object.keys(customerInfo);
            for(var i=0;i < keys.length; i++)
            {
               var k =keys[i];
               if(phone == customerInfo[k].phone)
               {
                console.log("phoneNumber matched:"+phone);
                 var new_name=customerInfo[k].name;
                 var new_phone=customerInfo[k].phone;
                 var new_address=customerInfo[k].address;
                 var new_product=Dproduct;

                 var table=document.getElementById("data_table");
                 var table_len=(table.rows.length)-1;
                 const row = document.createElement("tr");

			     

                if(new_name != "" && new_phone !="" && new_address !="" && new_product !="")
                 {
                  const cell1 = row.insertCell(0);
                  const cell2 = row.insertCell(1);	
                  const cell3 = row.insertCell(2);
                  const cell4 = row.insertCell(3);
                  const cell5 = row.insertCell(4);
                  const cell6 = row.insertCell(5);

                  cell1.outerHTML = "<tr id='row"+table_len+"'> <td id='name_row"+table_len+"'>"+new_name+"</td> </tr>";
                  cell2.outerHTML = "<tr id='row"+table_len+"'> <td id='phone_row"+table_len+"'>"+new_phone+"</td> </tr>";
                  cell3.outerHTML = "<tr id='row"+table_len+"'> <td id='address_row"+table_len+"'>"+new_address+"</td> </tr>";
                  cell4.outerHTML = "<tr id='row"+table_len+"'> <td id='product_row"+table_len+"'>"+new_product+"</td> </tr>";
                  cell5.outerHTML = "<tr id='row"+table_len+"'>   <td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'><br/><input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td>  </tr>";

                  //selectList.value=1;
                 // var optionSelected = document.getElementById("optionDelevery");
                  var selectedList = document.createElement("select");
                  var option1= document.createElement("option");
                  option1.value=1;
                  option1.text="Delivered";
                  

                  var option2= document.createElement("option");
                  option2.value=0;
                  option2.text="Not-Delivered";


                  if(Dstatus==0){
                  	selectedList.appendChild(option2);
                  selectedList.appendChild(option1);

                  }
                  else{
                  	selectedList.appendChild(option1);
                  	selectedList.appendChild(option2);
                  }
			      cell6.appendChild(selectedList.cloneNode(true));
			      
			      cell6.onchange=function () { 
			      
    				
			      	getRowNo(table_len,new_phone,Dstatus);}
			      

			      table.appendChild(row);
                 // var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'>     <td id='name_row"+table_len+"'>"+new_name+"</td>   <td id='phone_row"+table_len+"'>"+new_phone+"</td><td id='address_row"+table_len+"'>"+new_address+"</td>   <td id='product_row"+table_len+"'>"+new_product+"</td>           <td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'><input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td>    </tr>";
				  
				  document.getElementById("edit_button"+table_len).style.display="block";
                  document.getElementById("save_button"+table_len).style.display="none";
                 }
                 document.getElementById("new_name").value="";
                 document.getElementById("new_phone").value="";
                 document.getElementById("new_address").value="";
                 document.getElementById("new_product").value="";
                }
            }
          }
        });

}



function checkUser(){
  var user = firebase.auth().currentUser;
  if (user) {
    // User is signed in.
    window.location= "form.html";
    }
     else {
    window.location="index.html";
    // No user is signed in.
      }
}




function login(){
  //console.log("login clicked");

   var userEmail = document.getElementById("email_field").value;
   var userPass = document.getElementById("password_field").value;
   firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(user){
     //user sign in. pass& email is correct
     console.log("Welcome %s",userEmail);
     window.location.href = "form.html";
   }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;

     window.alert("Error : " + errorMessage);
     window.location.href = "index.html";
     // ...
   });
}

function logout(){
  window.alert("logout Successfully");
  firebase.auth().signOut();
}

function searchOnDatabase()
{
  //console.log("search button clicked");
  var ref = firebase.database().ref("customerInfo/");
  ref.once("value", function(snapshot) {
   //console.log(snapshot.val());
   var customerInfo = snapshot.val();
   var keys = Object.keys(customerInfo);
   //console.log(keys);
   var found =0;
  var currPhoneNumber = document.getElementById("phoneNumber").value;
  for(var i=0;i < keys.length; i++)
  {
    var k =keys[i];
    var dataBasePhoneNumber = customerInfo[k].phone;
    if(dataBasePhoneNumber == currPhoneNumber){
      //console.log("phone Number matched");
      found=1;
      var name = customerInfo[k].name;
      var address = customerInfo[k].address;
     // var product = customerInfo[k].product;
      //console.log("Key: " + k);
      document.getElementById("customerName").value = name;
      document.getElementById("customerAddress").value = address;
      //document.getElementById("customerProduct").value = product;
  	}

  }
  if(found==0){
    window.alert("New Customer.\nNo previous Data in Database !!");
    document.getElementById("customerName").value = "";
    document.getElementById("customerAddress").value = "";
    document.getElementById("customerProduct").value = "";
  }
    }, function (error) {
   console.log("Error: " + error.code);
});

 getShipmentNo(function(){
	var reff = firebase.database().ref(totalShipmentNo);
    reff.once("value", function(snapshot) 
  {
   var shipment = snapshot.val();
   if(shipment != null)
   {
      var ke = Object.keys(shipment);
      //console.log("key length:" + ke.length);
      var currPhoneNumber = document.getElementById("phoneNumber").value;
      for(var j=0;j < ke.length; j++)
      {
        var ko =ke[j];
        //console.log("key[j]: "+ko);
        var dataBasePhone = shipment[ko].phone;
        //console.log(" database phone :"+dataBasePhone +" curr: "+ currPhoneNumber);
        if(dataBasePhone == currPhoneNumber)
          {
          	var product = shipment[ko].product;
          	//console.log("product: "+product);
          	document.getElementById("customerProduct").value = product;
          }
      }
    }
  }, function (error) 
   {
    console.log("Error: " + error.code);
   });
});
}


function getShipmentNo(callback){
  var totalShipmentref= firebase.database().ref('shipmentCount');
  totalShipmentref.once("value", function(snapshot){
    var shipmentNO = snapshot.val();
    if(shipmentNO==null){
      //console.log("totalShipment NULL:" + totalShipmentNo);
      var data={
        Number: 1
      }
      totalShipmentref.push(data);
    }
    var key = Object.keys(shipmentNO);
    var k=key[0];
    totalShipmentNo = shipmentNO[k].Number;
    //console.log("totalShipment No:" + totalShipmentNo);
    callback();
  });
}

function submitOnDatabase()
{
  var phoneNumber = document.getElementById("phoneNumber").value;
  var customerName = document.getElementById("customerName").value;
  var customerProduct = document.getElementById("customerProduct").value;
  var customerAddress = document. getElementById("customerAddress").value;
  if(phoneNumber == "" || customerName == "" || customerProduct == "" || customerAddress == "")
  {
    window.alert("All Item should be filled up !!");
    //console.log("empty cell");
    return false;
  }
  if(phoneNumber.length !=11)
  {
    window.alert("Remove space from phone number !! Number should be 11 degit");
    return false;
  }
  var data = {
    phone: phoneNumber,
    name: customerName,
    address: customerAddress
  };
  var shipmentPhone= {
    phone: phoneNumber,
    product: customerProduct,
    delivaryStatus: 0
  }
  //search on database
  //console.log("submit on database");
  var ref = firebase.database().ref("customerInfo/");
  ref.once("value", function(snapshot) 
  {
   //console.log(snapshot.val());
   var customerInfo = snapshot.val();
   if(customerInfo != null)
   {
      var keys = Object.keys(customerInfo);
      //console.log(keys);
      var currPhoneNumber = document.getElementById("phoneNumber").value;
     // console.log("current phoneNumber:"+currPhoneNumber);
     // console.log("key length:" + keys.length);
      var match=0;
      for(var i=0;i < keys.length; i++)
      {
        var k =keys[i];
        var dataBasePhoneNumber = customerInfo[k].phone;
        if(dataBasePhoneNumber == currPhoneNumber)
          {
           // console.log("phone Number matched");
            match=1;
            const fb = firebase.database().ref();
            var updatedData = {
              name: customerName,
              address: customerAddress
            };
            fb.child('customerInfo/').child(k).update(updatedData);

            var productData= {
			  	product: customerProduct
			  };


			  //var reff = firebase.database().ref(totalShipmentNo);
			  


            getShipmentNo(function(){
            var reff = firebase.database().ref(totalShipmentNo);
            //reff.push(shipmentPhone);
            reff.once("value", function(snapshot) 
			  {
			   var shipment = snapshot.val();
			   if(shipment != null)
			   {
			      var keys = Object.keys(shipment);
			      for(var i=0;i < keys.length; i++)
			      {
			        var k =keys[i];
			        var dataBasePhoneNumber = shipment[k].phone;
			        if(dataBasePhoneNumber == currPhoneNumber)
			          {
			            //console.log("update product data");
			            reff.child(k).update(productData);
			            break;
			          }
			      }
			    }
			  }, function (error) 
			   {
			    console.log("Error: " + error.code);
			   });
          });
            
          }
      }
      if(!match){
          //console.log("New customer");
          var refer = firebase.database().ref('customerInfo');
          refer.push(data);

          
          getShipmentNo(function(){
          	var reff = firebase.database().ref(totalShipmentNo);
           reff.push(shipmentPhone);
            
          });
      }
    }
    else
    {
      //console.log("No data 1st");
      var refer = firebase.database().ref('customerInfo');
      refer.push(data);
      getShipmentNo(function(){
          var reff = firebase.database().ref(totalShipmentNo);
          reff.push(shipmentPhone);
        });
    }
    window.alert("Successfully Sumbitted to Database.");
    document.getElementById("customerName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("customerAddress").value = "";
    document.getElementById("customerProduct").value = "";
  }, function (error) 
   {
    console.log("Error: " + error.code);
   });
}

