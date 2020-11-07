

function edit_row(no)
{
 //console.log("edit clicked");
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var name=document.getElementById("name_row"+no);
 var phone=document.getElementById("phone_row"+no);
 var address=document.getElementById("address_row"+no);
 var product=document.getElementById("product_row"+no);

 var name_data=name.innerHTML;
 var phone_data=phone.innerHTML;
 var address_data=address.innerHTML;
 var product_data=product.innerHTML;

 name.innerHTML="<input type='text' id='name_text"+no+"' value='"+name_data+"'>";
 //phone.innerHTML="<input type='text' id='phone_text"+no+"' value='"+phone_data+"'>";
 address.innerHTML="<input type='text' id='address_text"+no+"' value='"+address_data+"'>";
 product.innerHTML="<input type='text' id='product_text"+no+"' value='"+product_data+"'>";
}




function delete_row(no)
{
 var result = confirm("Want to delete the Item?");
 if(result)
 { 
	 var phoneNumber=document.getElementById("phone_row"+no).innerHTML;
	  var ref = firebase.database().ref("customerInfo/");
	  ref.once("value", function(snapshot) 
	  {
	   var customerInfo = snapshot.val();
	   if(customerInfo != null)
	   {
	      var keys = Object.keys(customerInfo);
	      var currPhoneNumber = phoneNumber;
	      for(var i=0;i < keys.length; i++)
	      {
	        var k =keys[i];
	        var dataBasePhoneNumber = customerInfo[k].phone;
	        if(dataBasePhoneNumber == currPhoneNumber)
	          {
	            console.log("phone Number matched for delete");
	            const fb = firebase.database().ref();
	            fb.child('customerInfo/').child(k).remove();

	          }
	      }
	    }
	  }, function (error) 
	   {
	    console.log("customerInfo delete failed. Error: " + error.code);
	   });

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
	            reff.child(k).remove();
	          }
	      }
	    }
	  }, function (error) 
	   {
	    console.log("Total shipment number delete failed. Error: " + error.code);
	   });
	  console.log("Deleted row no: " + no);
	  document.getElementById("data_table").deleteRow(no+1);
  }
}



function save_row(no)
{
 var name_val=document.getElementById("name_text"+no).value;
 var phone_val=document.getElementById("phone_row"+no).innerHTML;
 var address_val=document.getElementById("address_text"+no).value;
 var product_val=document.getElementById("product_text"+no).value;
 if(name_val == "" || address_val == "" || product_val == "")
  {
  	window.alert("No Fields can't be Empty !!");
  	//console.log("empty cell");
  	return;
  }

 document.getElementById("name_row"+no).innerHTML=name_val; 
 document.getElementById("phone_row"+no).innerHTML=phone_val;
 document.getElementById("address_row"+no).innerHTML=address_val;
 document.getElementById("product_row"+no).innerHTML=product_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";

  var phoneNumber = phone_val;

  //console.log("phone number " + phoneNumber);
  var customerName = name_val;
  var customerAddress = address_val;
  var customerProduct = product_val;
  var data = {
    name: customerName,
    address: customerAddress
  };

  var ref = firebase.database().ref("customerInfo/");
  ref.once("value", function(snapshot) 
  {
   var customerInfo = snapshot.val();
   if(customerInfo != null)
   {
      var keys = Object.keys(customerInfo);
      var currPhoneNumber = phoneNumber;
      for(var i=0;i < keys.length; i++)
      {
        var k =keys[i];
        var dataBasePhoneNumber = customerInfo[k].phone;
        if(dataBasePhoneNumber == currPhoneNumber)
          {
            //console.log("phone Number matched");
            const fb = firebase.database().ref();
            fb.child('customerInfo/').child(k).update(data);

          }
      }
    }
  }, function (error) 
   {
    console.log("Error: " + error.code);
   });


   var productData= {
  	product: customerProduct
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
            reff.child(k).update(productData);
          }
      }
    }
  }, function (error) 
   {
    console.log("Error: " + error.code);
   });
}


function add_row()
{

 var new_name=document.getElementById("new_name").value;
 var new_phone=document.getElementById("new_phone").value;
 var new_address=document.getElementById("new_address").value;
 var new_product=document.getElementById("new_product").value;
 var table=document.getElementById("data_table");
 var table_len=(table.rows.length)-1;

 if(new_name != "" && new_phone.length == 11 && new_address !="" && new_product !="")
 {
 	var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='name_row"+table_len+"'>"+new_name+"</td><td id='phone_row"+table_len+"'>"+new_phone+"</td><td id='address_row"+table_len+"'>"+new_address+"</td><td id='product_row"+table_len+"'>"+new_product+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'><br/><input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";
 	document.getElementById("edit_button"+table_len).style.display="block";
 	document.getElementById("save_button"+table_len).style.display="none";

 	  var phoneNumber = new_phone;
	  var customerName = new_name;
	  var customerProduct = new_product;
	  var customerAddress = new_address;
	  var data = {
	    phone: phoneNumber,
	    name: customerName,
	    product: customerProduct,
	    address: customerAddress
	  };
	  var shipmentPhone= {
	    phone: phoneNumber,
	    product: customerProduct
	  }
	  //search on database
	  //console.log("submit on database");
	  var ref = firebase.database().ref("customerInfo/");
	  ref.once("value", function(snapshot) 
	  {
	  // console.log(snapshot.val());
	   var customerInfo = snapshot.val();
	   if(customerInfo != null)
	   {
	      var keys = Object.keys(customerInfo);
	      //console.log(keys);
	      var currPhoneNumber = phoneNumber;
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
	            const fb = firebase.database().ref();
	            var updatedData = {
	              product: customerProduct,
	              name: customerName,
	              address: customerAddress
	            };
	            fb.child('customerInfo/').child(k).update(updatedData);
	            match=1;
	          }
	      }
	      if(!match){
	         // console.log("push data");
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
	     // console.log("No data 1st");
	      var refer = firebase.database().ref('customerInfo');
	      refer.push(data);
	      getShipmentNo(function(){
	          var reff = firebase.database().ref(totalShipmentNo);
	          reff.push(shipmentPhone);
	        });
	    }
	  }, function (error) 
	   {
	    console.log("Error: " + error.code);
	   });
 }
 else{
 	window.alert("Phone Number should be 11 degit and all Fields Can't be Empty !!");
 }
 document.getElementById("new_name").value="";
 document.getElementById("new_phone").value="";
 document.getElementById("new_address").value="";
 document.getElementById("new_product").value="";
}