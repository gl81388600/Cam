function calculateAmortization() {
  const amount = parseFloat(document.getElementById("amount").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
  const insuranceRate = parseFloat(document.getElementById("insuranceRate").value) / 100;
  const disbursementDate = new Date(document.getElementById("disbursementDate").value);
  const firstPaymentDate = new Date(document.getElementById("firstPaymentDate").value);
  const term = parseInt(document.getElementById("term").value);

  const amortizationTable = document.getElementById("amortizationTable");
  amortizationTable.innerHTML = "";

  const monthlyPayment = (amount / term).toFixed(2);
  let balance = amount;
  let currentDate = new Date(firstPaymentDate);

  for (let i = 1; i <= term; i++) {
    const previousDate = i === 1 ? disbursementDate : new Date(currentDate);
    const daysBetween = Math.floor((currentDate - previousDate) / (1000 * 60 * 60 * 24));

    const interest = (balance * interestRate * daysBetween / 30).toFixed(2);

    let insurance = (balance * insuranceRate).toFixed(2);
    if (insurance < 2) insurance = 2.00;

    const totalPayment = (parseFloat(monthlyPayment) + parseFloat(interest) + parseFloat(insurance)).toFixed(2);
    const newBalance = (balance - monthlyPayment).toFixed(2);

    // Add row to the table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i}</td>
      <td>${currentDate.toLocaleDateString()}</td>
      <td>${daysBetween}</td>
      <td>${balance.toFixed(2)}</td>
      <td>${monthlyPayment}</td>
      <td>${insurance}</td>
      <td>${interest}</td>
      <td>${totalPayment}</td>
      <td>${newBalance}</td>
    `;
    amortizationTable.appendChild(row);

    balance -= monthlyPayment;
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
}
