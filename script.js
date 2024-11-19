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

  let currentDate = new Date(firstPaymentDate); // Inicializar con la fecha del primer pago

  for (let i = 1; i <= term; i++) {
    // Calcular días entre pagos
    const previousDate = i === 1 ? disbursementDate : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, firstPaymentDate.getDate());
    const daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));

    const interest = (balance * interestRate * daysBetween / 365).toFixed(2);
    const insurance = (balance * insuranceRate).toFixed(2);
    const totalPayment = (parseFloat(monthlyPayment) + parseFloat(interest) + parseFloat(insurance)).toFixed(2);
    const newBalance = (balance - monthlyPayment).toFixed(2);

    // Agregar fila a la tabla
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

    // Avanzar al siguiente mes, manteniendo el día del primer pago
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
}
