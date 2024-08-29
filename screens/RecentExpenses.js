import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDate } from "../util/date";

export default function RecentExpenses() {

    const expContext = useContext(ExpensesContext);

    const recentExps = expContext.expenses?.filter((exp) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDate(today, 7);

        return (exp.date >= date7DaysAgo) && (exp.date <= today);
    })

    return <ExpensesOutput expenses={recentExps} expensesPeriod="Last 7 days" fallbackText='No expenses' />
}