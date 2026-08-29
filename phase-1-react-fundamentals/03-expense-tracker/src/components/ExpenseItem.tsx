import type { Expense } from "../types/expense";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: number) => void;
}

function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  return (
    <div className="expense-item">
      <div>
        <h3>{expense.title}</h3>
        <p>{expense.category}</p>
      </div>

      <div className="expense-right">
        <strong>KSh {expense.amount.toLocaleString()}</strong>

        <button onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;