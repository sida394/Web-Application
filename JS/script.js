const sendToBackEnd =  (email)=>{
  const { ipcRenderer } = require('electron');
  ipcRenderer.send('asynchronous-message',[email]);
}

var title;
 document.querySelector('#form_input').style.display ="none";
function newTitle(){
    title = document.querySelector('#new-title');
    title.style.display ="none";
    document.querySelector('#sendTitle').style.display = "none";
    console.log( "document.querySelector('#form_input').style.display");
 document.querySelector('#form_input').style.display ="block";
    return title;
}

function dataForm(){
    
var name = document.querySelector('#name');
var nameValue = name.value;
var lastName = document.querySelector('#lastName'); 
var lastNameValue = lastName.value;
var mail = document.querySelector('#mail');
var mailValue = mail.value;
sendToBackEnd(mailValue);
var  phoneNumber = document.querySelector('#phoneNumber');
var phoneNumberValue = phoneNumber.value;
var data = [{name: nameValue,
             lastName : lastNameValue,
             mail : mailValue,
             phoneNumber: phoneNumberValue}];
    console.log(data);
    return data;
   
}


function csv(title,data){
    
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: title.value +".csv",
  header: [
    {id:'name',title:'Name'},
    {id:'lastName',title:'Last Name'},
    {id:'mail',title:'Mail'},
    {id:'phoneNumber',title:'Phone Number'}
  ]
});
     csvWriter.writeRecords (data).then(() => { 
        console.log (' ... Terminé') ;
    } ) ;

}


function formCleaning(title,name, lastName, mail, phoneNumber){
    
title.value="";    
name.value= "";
lastName.value = "";
mail.value = "";
phoneNumber.value = "";
    
}
function myFunctions(t){
    titleForApp = newTitle();
   datas = dataForm();
    csv(title,datas);
    formCleaning(datas);
    
    
}
