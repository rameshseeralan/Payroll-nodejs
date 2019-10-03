const expect = require('chai').expect;
const payroll = require('../payroll');

describe('getSalaryDate function test',function(){
    it('shouldn\'t return a Sunday 31/03/2019', function() {
        // 31/03/2019 is a Sunday
        expect(payroll.getSalaryDate(0,2,2019)).not.to.equal('2019-03-31');
    });

    it('shouldn\'t return a Saturday 31/08/2019', function() {
        // 31/08/2019 is a Saturday
        expect(payroll.getSalaryDate(0,7,2019)).not.to.equal('2019-08-31');
    });

    it('should return the last working day instead of Sunday 31/03/2019', function() {
        // 31/03/2019 is a Sunday
        expect(payroll.getSalaryDate(0,2,2019)).to.equal('2019-03-29');
    });

    it('should return the last working day instead of Saturday 31/08/2019', function() {
        // 31/08/2019 is a Saturday
        expect(payroll.getSalaryDate(0,7,2019)).to.equal('2019-08-30');
    });

    it('should return the working day 31/07/2019 is a wednesday', function() {
        // 31/07/2019 is a wednesday
        expect(payroll.getSalaryDate(0,6,2019)).to.equal('2019-07-31');
    });
});

describe('getExpenseDate 1st function test',function(){
    it('shouldn\'t return a Sunday 01/09/2019', function() {
        // 01/09/2019 is a Sunday
        expect(payroll.getExpenseDate(1,8,2019)).not.to.equal('2019-09-01');
    });

    it('shouldn\'t return a Saturday 01/06/2019', function() {
        // 01/06/2019 is a Saturday
        expect(payroll.getExpenseDate(1,5,2019)).not.to.equal('2019-06-01');
    });

    it('should return a Monday 02/09/2019 instead of Sunday 01/09/2019', function() {
        // 01/09/2019 is a Sunday
        expect(payroll.getExpenseDate(1,8,2019)).to.equal('2019-09-02');
    });

    it('should return a Monday 03/06/2019 instead of Saturday 01/06/2019', function() {
        // 01/06/2019 is a Saturday
        expect(payroll.getExpenseDate(1,5,2019)).to.equal('2019-06-03');
    });

    it('should return the workday 31/03/2019 is a Monday', function() {
        // 31/03/2019 is a Monday
        expect(payroll.getExpenseDate(1,6,2019)).to.equal('2019-07-01');
    });
});

describe('getExpenseDate 15th function test',function(){
    it('shouldn\'t return a Sunday 15/09/2019', function() {
        // 15/09/2019 is a Sunday
        expect(payroll.getExpenseDate(15,8,2019)).not.to.equal('2019-09-15');
    });

    it('shouldn\'t return a Saturday 15/06/2019', function() {
        // 15/06/2019 is a Saturday
        expect(payroll.getExpenseDate(15,5,2019)).not.to.equal('2019-06-15');
    });

    it('should return a Monday 16/12/2019 instead of Sunday 15/12/2019', function() {
        // 15/12/2019 is a Sunday
        expect(payroll.getExpenseDate(15,11,2019)).to.equal('2019-12-16');
    });

    it('should return a Monday 17/06/2019 instead of Saturday 15/06/2019', function() {
        // 15/06/2019 is a Saturday
        expect(payroll.getExpenseDate(15,5,2019)).to.equal('2019-06-17');
    });

    it('should return the Workday 15/02/2019 is a Friday', function() {
        // 15/02/2019 is a Friday
        expect(payroll.getExpenseDate(15,1,2019)).to.equal('2019-02-15');
    });
});

