document.getElementById("loan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener datos del formulario
  const loanAmount = parseFloat(document.getElementById("loan-amount").value);
  const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
  const lateInterestRate = parseFloat(document.getElementById("late-interest-rate").value) / 100;
  const insuranceRate = parseFloat(document.getElementById("insurance-rate").value) / 100;
  const disbursementDate = new Date(document.getElementById("disbursement-date").value);
  const firstPaymentDate = new Date(document.getElementById("first-payment-date").value);
  const loanTerm = parseInt(document.getElementById("loan-term").value);

  // Variables iniciales
  let balance = loanAmount;
  const monthlyInstallment = loanAmount / loanTerm; // Cuota mensual fija

  const tableBody = document.querySelector("#amortization-table tbody");
  tableBody.innerHTML = ""; // Limpiar la tabla antes de rellenarla

  for (let i = 0; i < loanTerm; i++) {
    const paymentDate = new Date(firstPaymentDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);

    const previousDate = i === 0 ? disbursementDate : new Date(firstPaymentDate);
    previousDate.setMonth(previousDate.getMonth() + i - 1);

    const daysBetween = Math.ceil(
      (paymentDate - previousDate) / (1000 * 60 * 60 * 24)
    );

    const insurance = Math.ceil(balance * insuranceRate);
    const interest = balance * (interestRate / 12);
    const totalPayment = monthlyInstallment + insurance + interest;
    const newBalance = balance - monthlyInstallment;

    // Agregar fila a la tabla
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

    // Actualizar el saldo
    balance = newBalance;
  }
});
