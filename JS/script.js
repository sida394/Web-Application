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

var titleP;
var title;
var entries = [];
document.querySelector('#form_input').style.display = "none";

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
        console.log("document.querySelector('#form_input').style.display");
        document.querySelector('#form_input').style.display = "block";


        return title;
    }
}


function dataForm() {

    var emptyFiled = 0;
    var name = document.querySelector('#name');
    document.querySelector('#form_input').style.display = "block";
    var nameValue = name.value;
    if (nameValue === '') {
        return emptyFiled;
    } else {

        var lastName = document.querySelector('#lastName');
        var lastNameValue = lastName.value;
        if (lastNameValue === '') {
            return emptyFiled;

        } else {
            var mail = document.querySelector('#mail');
            var mailValue = mail.value;
            if (mailValue === '') {
                return emptyFiled;

            } else {
                var phoneNumber = document.querySelector('#phoneNumber');
                var phoneNumberValue = phoneNumber.value;
                if (phoneNumberValue === '') {
                    return emptyFiled;


                } else {
                    var data = [{
                        name: nameValue,
                        lastName: lastNameValue,
                        mail: mailValue,
                        phoneNumber: phoneNumberValue
                    }];
                    entries.push(
                        {
                            name: nameValue,
                            lastName: lastNameValue,
                            mail: mailValue,
                            phoneNumber: phoneNumberValue
                        }
                    )
                    console.log(entries);
                    return data;
                }
            }
        }
    }
}






async function csv(title, data) {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: title + '.csv',
        append: true,
        header: [
            { id: 'name', title: 'Name' },
            { id: 'lastName', title: 'Last Name' },
            { id: 'mail', title: 'Mail' },
            { id: 'phoneNumber', title: 'Phone Number' }
        ]
    });
    let writed = false;
    await csvWriter.writeRecords(data).then(() => {
        writed = true;
    });
    return writed;
}




function myFunctions(t) {

    $('#badInfos').css('display', 'none');
    datas = dataForm();
    if (datas === 0) {
        $('#badInfos').html('<h3>Empty filed</h3>');
        $('#badInfos').css('display', 'block');
        $('#myModal').modal('show');
    } else {
        $('#badInfos').css('display', 'none');
        $('#goodInfos').css('display', 'none');
        csv(titleP, datas).then(() => {
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

$('#badInfos').css('display', 'none');
$('#goodInfos').css('display', 'none');

function toExcel() {
    /* Saves every entry in the data global variable into a sheet */
    var xl = require('excel4node');
    var wb = new xl.Workbook;
    var ws = wb.addWorksheet('Sheet1');

    ws.cell(1, 1).string('Name');
    ws.cell(1, 2).string('Last name');
    ws.cell(1, 3).string('Mail');
    ws.cell(1, 4).string('Phone number');


    for (let currentLine = 2; currentLine-2 < entries.length; currentLine++) {
        console.log(entries);
        ws.cell(currentLine, 1).string(entries[currentLine-2].name);
        ws.cell(currentLine, 2).string(entries[currentLine-2].lastName);
        ws.cell(currentLine, 3).string(entries[currentLine-2].mail);
        ws.cell(currentLine, 4).string(entries[currentLine-2].phoneNumber);
    }
    wb.write(titleP + '.xlsx');
}