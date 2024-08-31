export const categories = {
  income: [
    {
      id: 1,
      name: "Income",
      color: "green",
      labels: [
        { id: 1, name: "Paychecks" },
        { id: 2, name: "Interest" },
        { id: 3, name: "Business Income" },
        { id: 4, name: "Other Income" },
        { id: 5, name: "Dividens & Capital Gains" },
      ],
    },
  ],
  expenses: [
    {
      id: 1,
      name: "Housing",
      color: "mint",
      labels: [
        { id: 1, name: "Rent" },
        { id: 2, name: "Mortgage" },
        { id: 3, name: "Home Improvement" },
      ],
    },
    {
      id: 2,
      name: "Bills & Utilities",
      color: "cyan",
      labels: [
        { id: 1, name: "Phone" },
        { id: 2, name: "Garbage" },
        { id: 3, name: "Water" },
        { id: 4, name: "Gas & Electric" },
        { id: 5, name: "Internet & Cable" },
      ],
    },
    {
      id: 3,
      name: "Food & Dining",
      color: "orange",
      labels: [
        { id: 1, name: "Restaurants" },
        { id: 2, name: "Groceries" },
        { id: 3, name: "Coffee Shops" },
      ],
    },
    {
      id: 4,
      name: "Lifestyle",
      color: "pink",
      labels: [
        { id: 1, name: "Entertainment" },
        { id: 2, name: "Vacation" },
        { id: 3, name: "Personal" },
        { id: 4, name: "Pets" },
        { id: 5, name: "Fun Money" },
      ],
    },
    {
      id: 5,
      name: "Shopping",
      color: "yellow",
      labels: [
        { id: 1, name: "Shopping" },
        { id: 2, name: "Clothing" },
        { id: 3, name: "Furniture & Housewares" },
        { id: 4, name: "Electronics" },
      ],
    },
    {
      id: 6,
      name: "Education",
      color: "blue",
      labels: [
        { id: 1, name: "Student Loans" },
        { id: 2, name: "Education" },
      ],
    },
    {
      id: 7,
      name: "Health & Wellness",
      color: "red",
      labels: [
        { id: 1, name: "Medical" },
        { id: 2, name: "Dentist" },
        { id: 3, name: "Fitness" },
      ],
    },
    {
      id: 8,
      name: "Finacial",
      color: "violet",
      labels: [
        { id: 1, name: "Loan Repayment" },
        { id: 2, name: "Finacial & Legal Services" },
        { id: 3, name: "Finacial Fees" },
        { id: 4, name: "Cash & ATM" },
        { id: 5, name: "Insurance" },
        { id: 6, name: "Taxes" },
      ],
    },
    {
      id: 9,
      name: "Other",
      color: "default",
      labels: [
        { id: 1, name: "Miscellaneous" },
        { id: 2, name: "Uncategorized" },
        { id: 3, name: "Check" },
      ],
    },
  ],
  bills: [],
  savings: [],
  debt: [],
  contributions: [{ id: 1, name: "Goals" }],
}; // update to db

export const expenses = categories.expenses.flatMap(
  (category) => category.labels,
);
