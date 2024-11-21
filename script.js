function calcularFechaAnterior(fecha) {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
  if (nuevaFecha > fecha) {
    nuevaFecha.setFullYear(nuevaFecha.getFullYear() - 1);
  }
  return nuevaFecha;
}

function calculateAmortization() {
  // ... (obtener valores del formulario y validar campos) ...

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

    const interest = (initialBalance * interestRate * daysBetween) / 30;
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

// ... (event listener para calcular los días automáticamente) ...
