import { FlatList, Text } from "react-native";
import ExpensesItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return <ExpensesItem {...itemData.item} />
}

export default function ExpensesList({ expenses }) {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => {
                return item.id
            }}
        />
    )
}