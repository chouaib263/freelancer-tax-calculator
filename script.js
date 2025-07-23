const result = calculateTax(country, income, expenses);


document.getElementById("taxForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const country = document.getElementById("country").value;
  const income = parseFloat(document.getElementById("income").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const taxableIncome = income - expenses;

  let tax = 0;
  let details = "";

  if (country === "us") {
    tax = taxableIncome * 0.153;
    details = "Includes SE tax (15.3%)";
  } else if (country === "ca") {
    tax = taxableIncome * 0.119 + taxableIncome * 0.15;
    details = "Includes CPP (11.9%) + income tax (15%)";
  } else if (country === "uk") {
    tax = taxableIncome * 0.09 + 3.45 * 52;
    details = "Includes Class 2 (£3.45/week) + Class 4 (9%)";
  }

  document.getElementById("results").innerHTML = `
    <h3>Estimated Tax: $${tax.toFixed(2)}</h3>
    <p>${details}</p>
    <p>Taxable Income: $${taxableIncome.toFixed(2)}</p>
  `;
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const element = document.getElementById("results");
  const options = {
    filename: 'freelancer_tax_summary.pdf',
    margin: 0.5,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(options).from(element).save();
});
