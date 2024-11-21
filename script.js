function calcularFechaAnterior(fecha) {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
  if (nuevaFecha > fecha) {
    nuevaFecha.setFullYear(nuevaFecha.getFullYear() - 1);
  }
  return nuevaFecha;
}

function calculateAmortization() {
  // Obtener valores del formulario
  const amount = parseFloat(document.getElementById("amount").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
  const defaultInterestRate = parseFloat(document.getElementById("defaultInterestRate").value) / 100;
  const insuranceRate = parseFloat(document.getElementById("insuranceRate").value) / 100;
  const disbursementDate = new Date(document.getElementById("disbursementDate").value);
  const firstPaymentDate = new Date(document.getElementById("firstPaymentDate").value);
  const term = parseInt(document.getElementById("term").value);
  const days = parseInt(document.getElementById("days").value); // Obtener días del formulario

  // Validar que los campos del formulario tengan valores válidos
  if (isNaN(amount) || isNaN(interestRate) || isNaN(defaultInterestRate) || isNaN(insuranceRate) || isNaN(term) || isNaN(days) || !disbursementDate || !firstPaymentDate) {
    alert("Por favor, complete todos los campos del formulario correctamente.");
    return;
  }

  // Inicializar tabla y variables
  const amortizationTable = document.getElementById("amortizationTable");
  amortizationTable.innerHTML = "";
  let monthlyPayment = amount / term;
  let initialBalance = amount; // Saldo inicial igual al monto del préstamo
  let currentDate = new Date(firstPaymentDate);

  // Generar tabla de amortización
  for (let i = 1; i <= term; i++) {
    const previousDate = i === 1 ? disbursementDate : calcularFechaAnterior(currentDate);
    let daysBetween = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));
    if (i === 1) {
      daysBetween = days; // Usar días del formulario para el primer pago
    }

    // Calcular el interés mensual
    const interest = (initialBalance * interestRate * daysBetween) / 365; // Fórmula corregida

    // Calcular el seguro, asegurando que no sea menor que 2
    let insurance = initialBalance * insuranceRate;
    if (insurance < 2) {
      insurance = 2;
    }

    const totalPayment = monthlyPayment + interest + insurance;
    const newBalance = initialBalance - monthlyPayment; // Calcular nuevo saldo

    // Agregar fila a la tabla
    const row = amortizationTable.insertRow();
    row.insertCell().textContent = i;
    row.insertCell().textContent = currentDate.toLocaleDateString('es-NI');
    row.insertCell().textContent = daysBetween;
    row.insertCell().textContent = initialBalance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
    row.insertCell().textContent = monthlyPayment.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
    row.insertCell().textContent = insurance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
    row.insertCell().textContent = interest.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
    row.insertCell().textContent = totalPayment.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });
    row.insertCell().textContent = newBalance.toLocaleString('es-NI', { style: 'currency', currency: 'NIO' });

    initialBalance = newBalance; // Actualizar saldo inicial para la siguiente fila
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
