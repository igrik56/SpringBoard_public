window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const val ={
    amount: 100000,
    years: 7,
    rate: 0.03,
  }
  document.getElementById('loan-amount').value = val.amount;
  document.getElementById("loan-years").value = val.years;
  document.getElementById("loan-rate").value = val.rate;

  calculateMonthlyPayment(val);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const newValues = getCurrentUIValues();
  calculateMonthlyPayment(newValues);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
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
  updateMonthly(monthlyPayment.toString());
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = monthly;
}
