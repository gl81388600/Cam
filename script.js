function calculateAmortization() {
  // ... (obtener valores del formulario) ...

  const amortizationTable = document.getElementById("amortizationTable");
  amortizationTable.innerHTML = "";

  const monthlyPayment = (amount / term).toFixed(2);
  let balance = amount;

  let currentDate = new Date(firstPaymentDate);

  for (let i = 1; i <= term; i++) {
    // Calcular días entre pagos
    const previousDate = i === 1 
      ? disbursementDate  // Primer pago: usar fecha de desembolso
      : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()); // Demás pagos: usar mes anterior
    const daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));

    // ... (calcular interés, seguro, totalPayment, newBalance) ...

    // ... (agregar fila a la tabla) ...

    balance -= monthlyPayment;

    // Avanzar al siguiente mes, manteniendo el día del primer pago
    currentDate.setMonth(currentDate.getMonth() + 1); 
  }
}
