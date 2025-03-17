"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Expense } from "./ExpenseArea/ExpenseArea"

type ExpenseChartProps = {
  expenses: Expense[]
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground text-sm">
        No data to display
      </div>
    )
  }

  // Reduce orqali kategoriya yig‘indisini olish
  const categoryTotals = expenses.reduce<Record<string, number>>((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + amount
    return acc
  }, {})

  const data = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))

  const COLORS = [
    "#007bff", // Moviy (primary)
    "#28a745", // Yashil (secondary)
    "#ffc107", // Sariq (accent)
    "#dc3545", // Qizil (destructive)
    "#6c757d", // Kulrang (muted)
    "#f8f9fa", // Engil kulrang (card)
    "#e9ecef", // Yorqin kulrang (popover)
    "#ced4da", // Chegara rangi (border)
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="80%"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  )
}