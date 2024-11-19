function calcularFechaAnterior(fecha) {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
  if (nuevaFecha > fecha) {
    nuevaFecha.setFullYear(nuevaFecha.getFullYear() - 1);
  }
  return nuevaFecha;
}

function calculateAmortization() {
  // ... (obtener valores del formulario) ...

  const amortizationTable = document.getElementById("amortizationTable");
  amortizationTable.innerHTML = "";

  const monthlyPayment = (amount / term).toFixed(2);
  let balance = amount;
  let currentDate = new Date(firstPaymentDate);

  for (let i = 1; i <= term; i++) {
    // Calcular días entre pagos
    const previousDate = i === 1 ? disbursementDate : calcularFechaAnterior(currentDate);
    const daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));

    const interest = (balance * interestRate * daysBetween / 365).toFixed(2);

    // Calcular el seguro, asegurando que no sea menor que 2
    let insurance = (balance * insuranceRate).toFixed(2);
    if (parseFloat(insurance) < 2) {
      insurance = "2.00";
    }

    const totalPayment = (parseFloat(monthlyPayment) + parseFloat(interest) + parseFloat(insurance)).toFixed(2);
    const newBalance = (balance - parseFloat(monthlyPayment)).toFixed(2); // Corrección: Convertir monthlyPayment a número

    // ... (agregar fila a la tabla) ...

    balance = parseFloat(newBalance); // Corrección: Actualizar balance con el nuevo saldo como número

    // Avanzar al siguiente mes, manteniendo el día del primer pago
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
}
