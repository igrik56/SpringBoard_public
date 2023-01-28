
function testCalculateMonthlyPayment(values) {
  const monthlyInterest = values.rate/12;
  const months = values.years*12;
  let monthPay = 0;
  if (monthlyInterest === 0){
    monthPay = values.amount/months;
  }
  else{
    monthPay = (values.amount * monthlyInterest) / (1-(1+monthlyInterest)**(-1*months));
  }
  let monthlyPayment = ((Math.floor(monthPay*100))/100);
  return monthlyPayment.toString();
}

it('should calculate the monthly rate correctly', function () {
  expect(testCalculateMonthlyPayment({amount: 1000, years: 7, rate: 0.03})).toBe(`13.21`);
  expect(testCalculateMonthlyPayment({amount: 12000, years: 1, rate: 0.0})).toBe(`1000`);
});


it("should return a result with 2 decimal places", function() {
  expect(testCalculateMonthlyPayment({amount: 1000, years: 7, rate: 0.03}).indexOf(".")).toBe(testCalculateMonthlyPayment({amount: 1000, years: 7, rate: 0.03}).length-3);
});

/// etc
