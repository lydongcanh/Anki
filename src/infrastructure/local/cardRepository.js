import { AsyncStorage } from "react-native";
import Card from "../../core/entity/card";

const CARD_PREFIX_ID = "CARD";

export default class CardRepository {

    /** Get all cards. */
    async getAll() {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            
            const cards = [];
            for(const key of allKeys) {
                if (key.startsWith(CARD_PREFIX_ID)) {
                    const cardString = await AsyncStorage.getItem(key);
                    cards.push(JSON.parse(cardString));
                }
            }

            return { result: cards };
        } catch (error) {
            return { error: error };
        }
    }

    /** Get a card with its unique front. */
    async get(cardFront) {
        try {
            const cardsString = await AsyncStorage.getItem(CARD_PREFIX_ID + cardFront);
            if (cardsString === null)
                return { error: `${cardFront} doesn't exist.` }

            card = JSON.parse(cardsString);
            return { result: card };
        } catch (error) {
            return { error: error };
        }
    }

    /** Create new or update a card if it already exists. */
    async put(card) {
        try {
            await AsyncStorage.setItem(CARD_PREFIX_ID + card.front, JSON.stringify(card));
            return { result: `${card.front} card is put.` };
        } catch (error) {
            return { error: error };
        }
    }

    /** Delete a card with its unique front. */
    async delete(cardFront) {
        try {
            const existCard = await AsyncStorage.getItem(CARD_PREFIX_ID + cardFront);
            if (!existCard)
                return { error: `${front} card doesn't exist.` };

            await AsyncStorage.removeItem(CARD_PREFIX_ID + cardFront);
            return { result: `${cardFront} card is deleted.` };
        } catch (error) {
            return { error: error };
        }
    }
}