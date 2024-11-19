document.getElementById("loan-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener datos del formulario
  const loanAmount = parseFloat(document.getElementById("loan-amount").value);
  const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100; // 4.1% anual
  const insuranceRate = 0.0017; // 0.17% fijo
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

    // Calcular días entre pagos
    const daysBetween = Math.ceil((paymentDate - previousDate) / (1000 * 60 * 60 * 24));

    // Cálculo del seguro basado en el saldo inicial
    let insurance = balance * insuranceRate;
    insurance = insurance < 2 ? 2 : insurance; // Si es menor a 2, ajustar a 2

    // Cálculo del interés basado en días y saldo inicial
    const interest = (balance * interestRate * daysBetween) / 30;

    // Total a pagar
    const totalPayment = monthlyInstallment + insurance + interest;

    // Nuevo saldo
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
