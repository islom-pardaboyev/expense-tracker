import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import ExpenseTracker from "../../components/ExpenseForm";
import { Card, CardContent } from "../../components/ui/card";
import { format } from "date-fns";
import { Badge } from "../../components/ui/badge";
import { getStore, setStore } from "../../utils";
import ExpenseSummary from "../../components/ExpenseSummary";
import { ExpenseChart } from "../../components/ExpenseChart";
export type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: Date;
};

function ExpenseArea() {
  const [expenses, setExpenses] = useState<Expense[]>(
    getStore("history") || []
  );
  const [formVisible, setFormVisible] = useState(false);
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: !expenses.length ? 1 : (Number(expenses.at(-1)?.id) ?? 0) + 1,
    };
    setExpenses([...expenses, newExpense]);
    setFormVisible(false);
  };

  setStore("history", expenses);

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };
  return (
    <>
      <main className="container mx-auto py-10 px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Expense Tracker</h1>
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Expenses</h2>
              <Button
                onClick={() => setFormVisible(!formVisible)}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </div>
            {expenses.length === 0 && <h1 className="text-center font-bold text-lg">We don't have any changes</h1>}
            {formVisible && (
              <div className="mb-6">
                <ExpenseTracker
                  onSubmit={addExpense}
                  onCancel={() => setFormVisible(false)}
                />
              </div>
            )}

            <div className="space-y-4">
              {expenses.map((expense) => (
                <Card key={expense.id}>
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{expense.description}</h3>
                          <Badge variant="outline">{expense.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(expense.date), "MMM d, yyyy")}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">
                          ${expense.amount.toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteExpense(expense.id)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <ExpenseSummary expenses={expenses}/>
            <ExpenseChart expenses={expenses}/>
          </div>
        </div>
      </main>
    </>
  );
}

export default ExpenseArea;
