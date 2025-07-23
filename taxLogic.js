// Core tax calculation logic for freelancers in USA, Canada, UK

export function calculateTax(country, income, expenses) {
  const taxableIncome = income - expenses;
  let result = {
    taxableIncome: taxableIncome.toFixed(2),
    totalTax: 0,
    breakdown: {},
  };

  if (country === "us") {
    // 🇺🇸 USA
    // Self-Employment Tax: 15.3% flat
    const seTax = taxableIncome * 0.153;

    result.totalTax = seTax.toFixed(2);
    result.breakdown = {
      SE_Tax: seTax.toFixed(2),
      Notes: "Includes Social Security & Medicare at flat 15.3%",
    };
  } else if (country === "ca") {
    // 🇨🇦 Canada
    const cppRate = 0.119;
    const incomeTaxRate = 0.15;
    const cpp = taxableIncome * cppRate;
    const incomeTax = taxableIncome * incomeTaxRate;

    result.totalTax = (cpp + incomeTax).toFixed(2);
    result.breakdown = {
      CPP: cpp.toFixed(2),
      IncomeTax: incomeTax.toFixed(2),
      Notes: "Basic 2025 estimates: CPP 11.9%, federal income tax 15%",
    };
  } else if (country === "uk") {
    // 🇬🇧 UK
    const class2NIC = 3.45 * 52; // weekly rate × 52 weeks
    const class4Rate = 0.09;
    const class4NIC = taxableIncome * class4Rate;

    const totalUKTax = class2NIC + class4NIC;

    result.totalTax = totalUKTax.toFixed(2);
    result.breakdown = {
      Class2: class2NIC.toFixed(2),
      Class4: class4NIC.toFixed(2),
      Notes: "Estimates using Class 2 flat rate + Class 4 @ 9%",
    };
  }

  return result;
}
