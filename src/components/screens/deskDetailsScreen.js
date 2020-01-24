import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Text, Surface } from "react-native-paper";
import CardList from "../organisms/cardList";

export default function DeskDetailsScreen(props) {
    const ERROR_MESSAGE = "Invalid desk.";

    const { navigation } = props;
    const desk = navigation.getParam("desk", { error: ERROR_MESSAGE});

    const styles = StyleSheet.create({
        rootView: {
            flex: 1,
            alignContent: "flex-start",
            //justifyContent: "space-between"
        },
        surface: {
            alignItems: "flex-start",
            margin: "25%",
            padding: 8,
            elevation: 4,
            borderRadius: 16,
        },
        cardList: {
        }
    });

    const deskDetails = () => {
        if (!desk || desk.error)
            return ERROR_MESSAGE;

        return (
            <Surface style={styles.surface}>
                <Text>Name: {desk.name}</Text>
                <Text>Ease bonus: {desk.easeBonus}</Text>
                <Text>Interval modifier: {desk.intervalModifier}</Text>
                <Text>Total cards: {desk.cardFronts.length}</Text>
            </Surface>
        )
    }
    
    return (
        <SafeAreaView style={styles.rootView}>
            {deskDetails()}
            <CardList style={styles.cardList} desk={desk}/>
        </SafeAreaView>
    )
}