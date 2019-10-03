const moment = require('moment');
const fs = require('fs');

const getCalculations = (y) => {
    var data = [];

    for (m = 0; m < 12; m++) {
        data.push({
            monthName: moment(new Date(y, m, 1)).format('MMMM'),
            firstExpenseDate: getExpenseDate(1,m,y), 
            secondExpenseDate: getExpenseDate(15,m,y), 
            salaryDate: getSalaryDate(0,m,y)
        });
    }
    genExport(data,y);
};

const getSalaryDate = (d,m,y) => {

    let date = new Date(y, m + 1, d);

    if(date.getDay() == 6){
        // Saturday
        return moment(date).subtract(1, 'days').format('YYYY-MM-DD');

    }else if(date.getDay() == 0){
        // Sunday
        return moment(date).subtract(2, 'days').format('YYYY-MM-DD');

    }else{
        // Working day
        return moment(date).format('YYYY-MM-DD');

    }
};

const getExpenseDate = (d,m,y) => {

    let date = new Date(y, m, d);

    if(date.getDay() == 6){
        // Saturday
        return moment(date).add(2, 'days').format('YYYY-MM-DD');

    }else if(date.getDay() == 0){
        // Sunday
        return moment(date).add(1, 'days').format('YYYY-MM-DD');

    }else{
        // Working day
        return moment(date).format('YYYY-MM-DD');

    }
};

// Create the csv file 
const genExport = (data,year) => {

    const path = __dirname + `/${year}.txt`;
    const file = fs.createWriteStream(path);

    file.write('"Month Name", "1st expenses day", “2nd expenses day”, "Salary day"');

    data.forEach(function(d) {
        let row = `\n "${d.monthName}",   "${d.firstExpenseDate}",   "${d.secondExpenseDate}",  "${d.salaryDate}"`;
        file.write(row);
    });

    file.close();

    console.log(`
    =======================================================================
    Success, your ${path} was created!
    =======================================================================
    `);
};

if(process.argv[2] == '--current'){

    getCalculations(new Date().getFullYear());

}else if(process.argv[2] == '--year'){

    getCalculations(parseInt(process.argv[3]));

} else {
    console.log(`
    Correct usage:
    node payroll.js --current [generates a text containing the current year]
    or
    node payroll.js --year xxxx [generates a text containing the year specified]
    `)
}

module.exports = { getSalaryDate, getExpenseDate}