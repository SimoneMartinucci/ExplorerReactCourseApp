import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpenses() {
    const expContext = useContext(ExpensesContext);

    return <ExpensesOutput expenses={expContext.expenses} expensesPeriod="Total" fallbackText='No expenses' />
}