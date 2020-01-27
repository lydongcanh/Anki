import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Text, Surface } from "react-native-paper";
import CardList from "../organisms/cardList";

export default function DeskDetailsScreen(props) {
    const ERROR_MESSAGE = "Invalid desk.";

    const { navigation } = props;
    const desk = navigation.getParam("desk", { error: ERROR_MESSAGE});

    const styles = StyleSheet.create({
        rootView: {
            alignContent: "flex-start",
        },
        basicInfos: {
            padding: 8
        },
        cardList: {
        }
    });

    const deskDetails = () => {
        if (!desk || desk.error)
            return ERROR_MESSAGE;

        return (
            <View style={styles.basicInfos}>
                <Text>Name: {desk.name}</Text>
                <Text>Ease bonus: {desk.easeBonus}</Text>
                <Text>Interval modifier: {desk.intervalModifier}</Text>
                <Text>Total cards: {desk.cardFronts.length}</Text>
            </View>
        )
    }
    
    return (
        <SafeAreaView style={styles.rootView}>
            {deskDetails()}
            <CardList style={styles.cardList} desk={desk}/>
        </SafeAreaView>
    )
}