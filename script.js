document.getElementById("loan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const loanAmount = parseFloat(document.getElementById("loan-amount").value);
  const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
  const insuranceRate = parseFloat(document.getElementById("insurance-rate").value) / 100;
  const disbursementDate = new Date(document.getElementById("disbursement-date").value);
  const firstPaymentDate = new Date(document.getElementById("first-payment-date").value);
  const loanTerm = parseInt(document.getElementById("loan-term").value);

  let balance = loanAmount;
  const monthlyInstallment = loanAmount / loanTerm;

  const tableBody = document.querySelector("#amortization-table tbody");
  tableBody.innerHTML = "";

  for (let i = 0; i < loanTerm; i++) {
    const paymentDate = new Date(firstPaymentDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);

    const previousDate = i === 0 ? disbursementDate : new Date(firstPaymentDate);
    previousDate.setMonth(previousDate.getMonth() + i - 1);

    const daysBetween = Math.ceil((paymentDate - previousDate) / (1000 * 60 * 60 * 24));

    const insurance = Math.max(balance * insuranceRate, 2);
    const interest = (balance * interestRate * daysBetween) / 30;
    const totalPayment = monthlyInstallment + insurance + interest;
    const newBalance = balance - monthlyInstallment;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${paymentDate.toLocaleDateString()}</td>
      <td>${daysBetween}</td>
      <td>${balance.toFixed(2)}</td>
      <td>${monthlyInstallment.toFixed(2)}</td>
      <td>${insurance.toFixed(2)}</td>
      <td>${interest.toFixed(2)}</td>
      <td>${totalPayment.toFixed(2)}</td>
      <td>${newBalance.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);

    balance = newBalance;
  }
});
