import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import type { Expense } from "./types/expense";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      expense,
    ]);
  };

  const deleteExpense = (id: number) => {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  };

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <main className="app">
      <div className="expense-container">
        <h1>Expense Tracker</h1>

        <div className="total-card">
          <p>Total Expenses</p>
          <h2>KSh {total.toLocaleString()}</h2>
        </div>

        <ExpenseForm onAddExpense={addExpense} />

        <section>
          <h2>Expenses</h2>

          <ExpenseList
            expenses={expenses}
            onDelete={deleteExpense}
          />
        </section>
      </div>
    </main>
  );
}

export default App;