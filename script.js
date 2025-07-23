<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Freelancer Tax Calculator</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
  <style>
    body {
      font-family: Roboto, sans-serif;
      background: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-top: 15px;
    }
    input, select, button {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      font-size: 16px;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      margin-top: 20px;
      cursor: pointer;
      border-radius: 4px;
    }
    .results {
      margin-top: 30px;
      background: #e9f7ef;
      padding: 20px;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Freelancer Tax Calculator</h1>
    <form id="taxForm">
      <label for="country">Select Country:</label>
      <select id="country" required>
        <option value="us">🇺🇸 USA</option>
        <option value="ca">🇨🇦 Canada</option>
        <option value="uk">🇬🇧 UK</option>
      </select>

      <label for="income">Annual Income ($):</label>
      <input type="number" id="income" required />

      <label for="expenses">Business Expenses ($):</label>
      <input type="number" id="expenses" required />

      <button type="submit">Calculate Tax</button>
    </form>

    <div id="results" class="results"></div>

    <button id="exportBtn">📄 Download Results as PDF</button>
  </div>

  <!-- PDF Library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

  <!-- Tax Logic + Interactions -->
  <script>
    function calculateTax(country, income, expenses) {
      const taxableIncome = income - expenses;
      let result = {
        taxableIncome: taxableIncome.toFixed(2),
        totalTax: 0,
        breakdown: {}
      };

      if (country === "us") {
        const seTax = taxableIncome * 0.153;
        result.totalTax = seTax.toFixed(2);
        result.breakdown = {
          SE_Tax: seTax.toFixed(2),
          Notes: "Includes Self-Employment Tax (15.3%)"
        };
      } else if (country === "ca") {
        const cpp = taxableIncome * 0.119;
        const incomeTax = taxableIncome * 0.15;
        result.totalTax = (cpp + incomeTax).toFixed(2);
        result.breakdown = {
          CPP: cpp.toFixed(2),
          IncomeTax: incomeTax.toFixed(2),
          Notes: "Includes CPP (11.9%) + Income Tax (15%)"
        };
      } else if (country === "uk") {
        const class2 = 3.45 * 52;
        const class4 = taxableIncome * 0.09;
        result.totalTax = (class2 + class4).toFixed(2);
        result.breakdown = {
          Class2: class2.toFixed(2),
          Class4: class4.toFixed(2),
          Notes: "Includes Class 2 (£3.45/week) + Class 4 (9%)"
        };
      }

      return result;
    }

    document.getElementById("taxForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const country = document.getElementById("country").value;
      const income = parseFloat(document.getElementById("income").value);
      const expenses = parseFloat(document.getElementById("expenses").value);
      const result = calculateTax(country, income, expenses);

      document.getElementById("results").innerHTML = `
        <h3>Estimated Tax: $${result.totalTax}</h3>
        <p>${result.breakdown.Notes}</p>
        <p>Taxable Income: $${result.taxableIncome}</p>
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
  </script>
</body>
</html>
