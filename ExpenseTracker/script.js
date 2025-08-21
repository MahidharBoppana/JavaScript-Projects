document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.getElementById("input-name");
  const inputAmount = document.getElementById("input-amount");
  const addExpense = document.getElementById("add-expense");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total");

  let expenses = JSON.parse(localStorage.getItem("expense")) || [];

  addExpense.addEventListener("click", (e) => {
    e.preventDefault();
    let name = inputName.value.trim();
    let amount = parseFloat(inputAmount.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };
      expenses.push(newExpense);
      saveExpenseToLocal();
      renderExpenses();
      inputName.value = "";
      inputAmount.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach((expense) => {
      let expenseItem = document.createElement("li");
      let textspan = document.createElement("span");
      let deleteExpenseBtn = document.createElement("button");
      deleteExpenseBtn.textContent = "x";
      deleteExpenseBtn.addEventListener("click", function () {
        expenses = expenses.filter((e) => e.id !== expense.id);
        saveExpenseToLocal();
        renderExpenses();
      });
      textspan.textContent = `${expense.name} - ₹${expense.amount}`;
      expenseItem.appendChild(textspan);
      expenseItem.appendChild(deleteExpenseBtn);
      expenseList.appendChild(expenseItem);
      total += expense.amount;
    });

    totalAmountDisplay.textContent = `Total Expenses : ₹${total}`;
  }

  function saveExpenseToLocal() {
    localStorage.setItem("expense", JSON.stringify(expenses));
  }

  renderExpenses();
});
