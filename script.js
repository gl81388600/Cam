function calcularFechaAnterior(fecha) {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
  if (nuevaFecha > fecha) {
    nuevaFecha.setFullYear(nuevaFecha.getFullYear() - 1);
  }
  return nuevaFecha;
}

function calculateAmortization() {
  const amount = parseFloat(document.getElementById("amount").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
  const defaultInterestRate = parseFloat(document.getElementById("defaultInterestRate").value) / 100;
  const insuranceRate = parseFloat(document.getElementById("insuranceRate").value) / 100;
  const disbursementDate = new Date(document.getElementById("disbursementDate").value);
  const firstPaymentDate = new Date(document.getElementById("firstPaymentDate").value);
  const term = parseInt(document.getElementById("term").value);
  const days = parseInt(document.getElementById("days").value);

  const amortizationTable = document.getElementById("amortizationTable");
  amortizationTable.innerHTML = "";

  const monthlyPayment = (amount / term).toFixed(2);
  let balance = amount;
  let currentDate = new Date(firstPaymentDate);

  for (let i = 1; i <= term; i++) {
    // Calcular días entre pagos
    const previousDate = i === 1 ? disbursementDate : calcularFechaAnterior(currentDate);
    let daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));

    // Ajustar días entre pagos para el primer pago
    if (i === 1) {
      daysBetween = days;
    }

    const interest = (balance * interestRate * daysBetween / 365).toFixed(2);

    // Calcular el seguro, asegurando que no sea menor que 2
    let insurance = (balance * insuranceRate).toFixed(2);
    if (parseFloat(insurance) < 2) {
      insurance = "2.00";
    }

    const totalPayment = (parseFloat(monthlyPayment) + parseFloat(interest) + parseFloat(insurance)).toFixed(2);
    const newBalance = (balance - parseFloat(monthlyPayment)).toFixed(2);

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

    balance = parseFloat(newBalance);

    // Avanzar al siguiente mes, manteniendo el día del primer pago
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
}
