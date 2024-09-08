export function getCategoryColor(category: string) {
  let color = "default";

  switch (category) {
    case "Income":
      color = "green";
      break;
    case "Housing":
      color = "cyan";
      break;
    case "Bills & Utilities":
      color = "blue";
      break;
    case "Food & Dining":
      color = "orange";
      break;
    case "Lifestyle":
      color = "pink";
      break;
    case "Shopping":
      color = "yellow";
      break;
    case "Health & Wellness":
      color = "red";
      break;
    case "Finacial":
      color = "purple";
      break;
    case "Other":
      color = "neutral";
      break;
    case "Debt":
      color = "purple";
      break;
    case "Savings":
      color = "emerald";
      break;
    default:
      color = "neutral";
      break;
  }

  return color;
}

export function getLabelColor(category: string) {
  let color = "default";

  switch (category) {
    case "Rent":
      color = "cyan";
      break;
    case "Mortgage":
      color = "sky";
      break;
    case "Phone":
      color = "blue";
      break;
    case "Garbage":
      color = "blue";
      break;
    case "Water":
      color = "blue";
      break;
    case "Gas & Electric":
      color = "blue";
      break;
    case "Internet & Cable":
      color = "blue";
      break;
    case "Credit Card":
      color = "indigo";
      break;
    case "Restaurants":
      color = "orange";
      break;
    case "Groceries":
      color = "orange";
      break;
    case "Coffee Shops":
      color = "orange";
      break;
    case "Entertainment":
      color = "pink";
      break;
    case "Vacation":
      color = "pink";
      break;
    case "Personal":
      color = "fuchsia";
      break;
    case "Pets":
      color = "fuchsia";
      break;
    case "Fun Money":
      color = "fuchsia";
      break;
    case "Shopping":
      color = "yellow";
      break;
    case "Clothing":
      color = "yellow";
      break;
    case "Furniture & Housewares":
      color = "yellow";
      break;
    case "Electronics":
      color = "yellow";
      break;
    case "Medical":
      color = "red";
      break;
    case "Dentist":
      color = "red";
      break;
    case "Fitness":
      color = "rose";
      break;
    case "Finacial Fees":
      color = "violet";
      break;
    case "Cash & ATM":
      color = "violet";
      break;
    case "Insurance":
      color = "violet";
      break;
    case "Taxes":
      color = "purple";
      break;
    case "Miscellaneous":
      color = "slate";
      break;
    case "Uncategorized":
      color = "zinc";
      break;
    case "Check":
      color = "stone";
      break;
    case "Student Loans":
      color = "purple";
      break;
    case "Loan Repayment":
      color = "purple";
      break;
    case "Personal Loans":
      color = "purple";
      break;
    case "Debt":
      color = "purple";
      break;
    case "Savings":
      color = "emerald";
      break;
    case "Emergency Fund":
      color = "teal";
      break;
    default:
      color = "neutral";
      break;
  }

  return color;
}
