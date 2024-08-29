import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Buttons";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpense({ route, navigation }) {

    const expContext = useContext(ExpensesContext);

    const expenseId = route.params?.expenseId
    const isEditing = !!expenseId;

    const selectedExp = expContext.expenses.find(exp => exp.id === expenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing])

    function deleteExpenseHandler() {
        expContext.deleteExpense(expenseId)
        navigation.goBack();
    }

    function onCancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expData) {
        if (isEditing) expContext.updateExpense(expenseId, expData)
        else expContext.addExpense(expData)
        navigation.goBack();

    }

    return (
        <View style={styles.container}>
            <ExpenseForm defaultValue={selectedExp} onCancel={onCancelHandler} onSubmit={confirmHandler} submitLabel={isEditing ? 'Update' : 'Add'} />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon={'trash'}
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})