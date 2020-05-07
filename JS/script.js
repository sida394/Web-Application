function dataForm(){
    
var name = document.querySelector('#name');
var nameValue = name.value;
var lastName = document.querySelector('#lastName'); 
var lastNameValue = lastName.value;
var mail = document.querySelector('#mail');
var mailValue = mail.value;
var  phoneNumber = document.querySelector('#phoneNumber');
var phoneNumberValue = phoneNumber.value;
var data = [{name: nameValue,
             lastName : lastNameValue,
             mail : mailValue,
             phoneNumber: phoneNumberValue}];
    console.log(data);
    return data;
    return name;
    return lastName;
    return mail;
    return phoneNumber;
    
    
   
}


function csv(data){
    
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'form.csv',
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


function formCleaning(name, lastName, mail, phoneNumber){
    
name.value= "";
lastName.value = "";
mail.value = "";
phoneNumber.value = "";
    
}
function myFunctions(){
    
   datas = dataForm();
    csv(datas);
    formCleaning(datas);
    
    
}