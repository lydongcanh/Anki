import { AsyncStorage } from "react-native";
import { CARD_PREFIX_ID } from "../../core/constraints";
import Desk from "../../core/entity/desk";
import Card from "../../core/entity/card";

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

    /**
     * Get a card with its unique front.
     * @param {string} cardFront 
     * @param {Desk} desk 
     */
    async get(cardFront, desk) {
        try {
            const cardsString = await AsyncStorage.getItem(CARD_PREFIX_ID + desk.name + cardFront);
            if (cardsString === null)
                return { error: `${cardFront} doesn't exist.` }

            card = JSON.parse(cardsString);
            return { result: card };
        } catch (error) {
            return { error: error };
        }
    }

    /**
     * Create new or update a card if it already exists.
     * @param {Card} card 
     * @param {Desk} desk 
     */
    async put(card, desk) {
        try {
            await AsyncStorage.setItem(CARD_PREFIX_ID + desk.name + card.front, JSON.stringify(card));
            return { result: card };
        } catch (error) {
            return { error: error };
        }
    }

    /**
     * Delete a card.
     * @param {string} cardFront 
     * @param {Desk} desk 
     */
    async delete(cardFront, desk) {
        try {
            const existCard = await AsyncStorage.getItem(CARD_PREFIX_ID + desk.name + cardFront);
            if (!existCard)
                return { error: `${front} card doesn't exist.` };

            await AsyncStorage.removeItem(CARD_PREFIX_ID + desk.name + cardFront);
            return { result: `${cardFront} card is deleted.` };
        } catch (error) {
            return { error: error };
        }
    }
}