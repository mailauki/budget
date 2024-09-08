export const categories = {
  income: [
    {
      id: 1,
      name: "Income",
      labels: [
        { id: 1, name: "Paychecks" },
        { id: 2, name: "Interest" },
        { id: 3, name: "Business Income" },
        { id: 4, name: "Other Income" },
        { id: 5, name: "Dividens & Capital Gains" },
        { id: 6, name: "Rollover" },
      ],
    },
  ],
  expenses: [
    {
      id: 2,
      name: "Food & Dining",
      labels: [
        { id: 1, name: "Restaurants" },
        { id: 2, name: "Groceries" },
        { id: 3, name: "Coffee Shops" },
      ],
    },
    {
      id: 3,
      name: "Lifestyle",
      labels: [
        { id: 1, name: "Entertainment" },
        { id: 2, name: "Vacation" },
        { id: 3, name: "Personal" },
        { id: 4, name: "Pets" },
        { id: 5, name: "Fun Money" },
      ],
    },
    {
      id: 4,
      name: "Shopping",
      labels: [
        { id: 1, name: "Shopping" },
        { id: 2, name: "Clothing" },
        { id: 3, name: "Furniture & Housewares" },
        { id: 4, name: "Electronics" },
      ],
    },
    {
      id: 5,
      name: "Health & Wellness",
      labels: [
        { id: 1, name: "Medical" },
        { id: 2, name: "Dentist" },
        { id: 3, name: "Fitness" },
      ],
    },
    {
      id: 6,
      name: "Finacial",
      labels: [
        { id: 1, name: "Finacial Fees" },
        { id: 2, name: "Cash & ATM" },
        { id: 3, name: "Insurance" },
        { id: 4, name: "Taxes" },
      ],
    },
    {
      id: 7,
      name: "Other",
      labels: [
        { id: 1, name: "Miscellaneous" },
        { id: 2, name: "Uncategorized" },
        { id: 3, name: "Check" },
      ],
    },
  ],
  bills: [
    {
      id: 8,
      name: "Housing",
      labels: [
        { id: 1, name: "Rent" },
        { id: 2, name: "Mortgage" },
      ],
    },
    {
      id: 9,
      name: "Bills & Utilities",
      labels: [
        { id: 1, name: "Phone" },
        { id: 2, name: "Garbage" },
        { id: 3, name: "Water" },
        { id: 4, name: "Gas & Electric" },
        { id: 5, name: "Internet & Cable" },
        { id: 6, name: "Credit Card" },
      ],
    },
  ],
  savings: [
    {
      id: 10,
      name: "Savings",
      labels: [
        { id: 1, name: "Savings" },
        { id: 2, name: "Emergency Fund" },
      ],
    },
  ],
  debt: [
    {
      id: 11,
      name: "Debt",
      labels: [
        { id: 1, name: "Student Loans" },
        { id: 2, name: "Loan Repayment" },
        { id: 3, name: "Personal Loans" },
      ],
    },
  ],
  contributions: [
    {
      id: 12,
      name: "Goals",
      labels: [
        { id: 1, name: "House Savings" },
        { id: 2, name: "Emergency Fund" },
        { id: 3, name: "Student Loans" },
        { id: 4, name: "Bootcamp Loan" },
      ],
    },
  ],
}; // update to db

export const expenses = categories.expenses.flatMap(
  (category) => category.labels,
);
