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

  let monthlyPayment = amount / term; // Sin redondear
  let balance = amount;
  let currentDate = new Date(firstPaymentDate);

  for (let i = 1; i <= term; i++) {
    // Calcular días entre pagos
    const previousDate = i === 1 ? disbursementDate : calcularFechaAnterior(currentDate);
    let daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));

    // ... (resto del código para calcular interés, seguro, etc.) ...

    // Avanzar al siguiente mes, manteniendo el día del primer pago
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
}

// Event listener para calcular los días automáticamente
const loanForm = document.getElementById('loanForm');
const disbursementDateInput = document.getElementById('disbursementDate');
const firstPaymentDateInput = document.getElementById('firstPaymentDate');
const daysInput = document.getElementById('days');

loanForm.addEventListener('change', () => {
  const disbursementDate = new Date(disbursementDateInput.value);
  const firstPaymentDate = new Date(firstPaymentDateInput.value);

  const daysBetween = Math.round((firstPaymentDate - disbursementDate) / (1000 * 60 * 60 * 24));
  daysInput.value = daysBetween;
});
