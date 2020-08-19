const { data } = require('jquery');

async function dialog() {
    var pathcsv = "";
    const { dialog } = require('electron').remote;
    await dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
        pathcsv += result.filePaths[0];

    }).catch(err => {
        console.log(err)
    });
    return pathcsv;
}
document.querySelector('#title').style.display = "none";
var exestingEventValue = true;
var i;

function newEvent() {
    document.querySelector('#event').style.display = "none";
    document.querySelector('#title').style.display = "block";
    exestingEventValue = false

}


async function exestingEvent() {
    var pathcsv = "";
    const { dialog } = require('electron').remote;
    await dialog.showOpenDialog({ properties: ['openFile'] }).then(result => {
        pathcsv += result.filePaths[0];
    }).catch(err => {
        console.log(err)
    });

    document.querySelector('#event').style.display = "none";
    document.querySelector('#form_input').style.display = "block";

    titleP = pathcsv.split('.')[0]

}

var titleP;
var title;
document.querySelector('#form_input').style.display = "none";
var titleSend = document.querySelector('#new-title');
titleSend.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendTitle").click();
    }
});

async function newTitle() {
    title = document.querySelector('#new-title');
    if (title.value === '') {
        $('#badInfos').html('<h3>Empty fields</h3>');
        $('#badInfos').css('display', 'block');
        $('#myModal').modal('show');
    } else {
        titleP = await dialog();
        titleP = titleP + "\\" + title.value;

        title.style.display = "none";
        document.querySelector('#sendTitle').style.display = "none";
        document.querySelector('#form_input').style.display = "block";
        return title;
    }
    exestingEventValue = false
    return title;
}


var formSend = document.querySelector('#phoneNumber');
formSend.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendForm").click();
    }
});

function dataForm() {

    var emptyFiled = 0;
    var name = document.querySelector('#name').value;
    var lastName = document.querySelector('#lastName').value;
    var mail = document.querySelector('#mail').value;
    var phoneNumber = document.querySelector('#phoneNumber').value;
    document.querySelector('#form_input').style.display = "block";

    if (name == '' || lastName == '' || mail == '' || phoneNumber == '')
        return emptyFiled;
    else {
        var data = [{
            name: name,
            lastName: lastName,
            mail: mail,
            phoneNumber: phoneNumber
        }];
        return data;
    }
}






async function csv(exestingEventValue, title, data) {

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: title + '.csv',
        append: exestingEventValue,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'lastName', title: 'Last Name' },
            { id: 'mail', title: 'Mail' },
            { id: 'phoneNumber', title: 'Phone Number' }
        ]
    });
    window.exestingEventValue = true
    let writed = false;
    await csvWriter.writeRecords(data).then(() => {
        writed = true;
    });
    return writed;
}


$('#badInfos').css('display', 'none');
$('#goodInfos').css('display', 'none');

function myFunctions(t) {


    $('#badInfos').css('display', 'none');
    datas = dataForm()

    // mail condition
    var i;
    var mailCondition = 1;
    for (i = 0; i < datas[0].mail.length; i++) {
        if (datas[0].mail[i] === '@') mailCondition--;
    }

    if (datas === 0) {
        $('#badInfos').html('<h3>Empty filed</h3>');
        $('#badInfos').css('display', 'block');
        $('#myModal').modal('show');
    } else if (datas[0].phoneNumber[0] != 0 || datas[0].phoneNumber.length != 10) {

        $('#badInfos').html('<h3>Your phone number is wrong</h3>');
        $('#badInfos').css('display', 'block');
        $('#myModal').modal('show');

    } else if (mailCondition) {

        $('#badInfos').html('<h3>Your mail is wrong</h3>');
        $('#badInfos').css('display', 'block');
        $('#myModal').modal('show');
    } else {
        $('#badInfos').css('display', 'none');
        $('#goodInfos').css('display', 'none');
        csv(exestingEventValue, titleP, datas).then(() => {
            $('#goodInfos').html('<h3>save successfully</h3>');
            $('#goodInfos').css('display', 'block');
            $('#myModal').modal('show');
        }).catch(() => {
            $('#badInfos').html('<h3>Save failed</h3>');
            $('#badInfos').css('display', 'block');
            $('#myModal').modal('show');
        });
    }
    document.querySelector('#name').value = "";
    document.querySelector('#lastName').value = "";
    document.querySelector('#mail').value = "";
    document.querySelector('#phoneNumber').value = "";
}


function toExcel() {
    const convertCsvToXlsx = require('@aternus/csv-to-xlsx');

    let source = titleP + '.csv';
    let destination = titleP + '.xlsx';

    try {
        convertCsvToXlsx(source, destination, true);
        $('#goodInfos').html('<h3>exported successfully</h3>');
        $('#goodInfos').css('display', 'block');
        $('#myModal').modal('show');
    } catch (e) {
        console.error(e.toString());
        $('#badInfos').html('<h3>export failed</h3>');
        $('#badInfos').css('display', 'block');
        $('#myModal').modal('show');
    }

    // 
}