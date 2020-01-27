import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import CardList from "../organisms/cardList";
import Toast from "react-native-simple-toast";
import { CardServices, DeskServices } from "../../core/services/services";

export default function DeskDetailsScreen(props) {
    const [isLoadingCards, setIsLoadingCards] = useState(false);
    const [cards, setCards] = useState([]);

    const ERROR_MESSAGE = "Invalid desk.";

    const { navigation } = props;
    const desk = navigation.getParam("desk", { error: ERROR_MESSAGE});

    const styles = StyleSheet.create({
        basicInfos: {
            padding: 8
        },
    });

    useEffect(() => {
        async function loadCards() {
            setIsLoadingCards(true);
            const result = await CardServices.getAllCards(desk);
            setCards(result.result);
            setIsLoadingCards(false);
        }

        loadCards();
    }, []);

    const deskDetails = () => {
        if (!desk || desk.error)
            return ERROR_MESSAGE;

        return (
            <View style={styles.basicInfos}>
                <Text>Name: {desk.name}</Text>
                <Text>Ease bonus: {desk.easeBonus}</Text>
                <Text>Interval modifier: {desk.intervalModifier}</Text>
                <Text>Total cards: {cards.length}</Text>
            </View>
        )
    }
    
    async function handleDeleteCard(card, desk) {
        const result = await DeskServices.deleteCard(desk, card);
        if (result.error) {
            Toast.show(`Failed to delete card: ${result.error}`);
            return;
        }

        const newCards = [...cards];

        const removeIndex = newCards.indexOf(card);
        if (removeIndex != -1)
            newCards.splice(removeIndex, 1);

        setCards(newCards);
    }

    return (
        <View>
            {deskDetails()}
            <Divider inset/>
            <CardList 
                desk={desk} 
                deleteCardFunc={handleDeleteCard}
                isLoading={isLoadingCards}
                cards={cards}
            />
        </View>
    )
}