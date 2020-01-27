import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import Toast from "react-native-simple-toast";
import { DeskServices } from "../../core/services/services";

/**
 * @param {*} props [navigation: desk]
 */
export default function CreateCardScreen(props) {
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const { navigation } = props;
    const desk = navigation.getParam("desk", {});

    const styles = StyleSheet.create({
        rootView: {
            flex: 1,
            alignContent: "center",
            padding: 16,
            flexDirection: "column",
            justifyContent: "space-between"
        }
    });

    async function handleAddNewCard() {
        if (!front || !back || !desk)
            return;

        if (front === "" || back === "")
            return;

        const result = await DeskServices.addNewCard(desk, {front, back});
        if (result.error) {
            Toast.show(result.error);
        } else {
            Toast.show(result.result);
            setFront("");
            setBack("");
        }
    }

    return (
        <SafeAreaView style={styles.rootView}>
            <TextInput
                label="Question"
                mode="outlined"
                multiline
                numberOfLines={12}
                value={front}
                onChangeText={text => setFront(text)}
            />
            <TextInput
                label="Answer"
                mode="outlined"
                multiline
                numberOfLines={12}
                value={back}
                onChangeText={text => setBack(text)}
            />
            <Button mode="contained" onPress={handleAddNewCard}>Add</Button>
        </SafeAreaView>
    );
}