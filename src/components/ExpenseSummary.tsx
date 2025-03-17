import { Expense } from "./ExpenseArea/ExpenseArea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ExpenseSummaryProps = {
  expenses: Expense[];
};

function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const thisMonthTotal = expenses.reduce(
    (acc, expense) => expense.amount + acc,
    0
  );
  const thisMonthExpenses = expenses.filter(
    (expense) => new Date(expense.date).getMonth() === new Date().getMonth()
  );
  const totalAmount = expenses.reduce(
    (acc, expense) => expense.amount + acc,
    0
  );
  const averageExpense = expenses.reduce(
    (acc, expense) => (acc + expense.amount) / expenses.length,
    0
  );
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Across {expenses.length} expenses
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${thisMonthTotal.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {thisMonthExpenses.length} expenses in{" "}
            {new Date().toLocaleString("default", { month: "long" })}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Average Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${averageExpense.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Per transaction</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExpenseSummary;
