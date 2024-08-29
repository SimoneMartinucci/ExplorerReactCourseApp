import { StyleSheet, Text, View, Alert } from "react-native";
import InputForm from "./InputForm";
import { useState } from "react";
import Button from "../UI/Buttons";
import { getFormattedDate } from "../../util/date";

export default function ExpenseForm({ onCancel, onSubmit, submitLabel, defaultValue }) {

    const [inputValues, setInputValues] = useState({
        amount: defaultValue ? defaultValue.amount.toString() : '',
        date: defaultValue ? getFormattedDate(defaultValue.date) : '',
        description: defaultValue ? defaultValue.description : ''
    });


    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }

    function submitHandler() {
        const expData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }

        onSubmit(expData);
    }

    const amountIsValid = !isNaN(expData.amount) && expData.amount > 0;
    const dateIsValid = expData.date.toString() !== 'Invalid Date'
    const descIsValid = expData.description.trim().length > 0;

    if (!amountIsValid && !dateIsValid && !descIsValid) {
        Alert.alert('Invalid input', 'Please check your input values')
        return;
    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <InputForm
                style={styles.rowInput}
                label='Amount' textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputValues.amount
                }} />
            <InputForm
                style={styles.rowInput}
                label='Date' textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date
                }} />
        </View>
        <InputForm
            label='Description' textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description
            }} />
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitLabel}</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1,
    },
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 24,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
});