import { AsyncStorage } from "react-native";

export default class CardRepository {

    /** Get all cards in a desk. */
    async get(deskName) {
        try {
            const cardsString = await AsyncStorage.getItem(deskName);
            if (cardsString === null)
                return { error: "Error retrieving data!" }

            cards = JSON.parse(cardsString);
            return { result: cards };
        } catch (error) {
            return { error: error };
        }
    }

    /** Create new card in a desk. */
    async create({ deskName, front, back }) {
        const result = await this.get(deskName);
        if (result.error)
            return result;

        try {
            const cards = result.result;
            for (const card of cards) {
                if (card.front === front)
                    return { error: `${front} card already exist.` };
            }

            cards.push({
                front: front,
                back: back
            });
            await AsyncStorage.setItem(deskName, JSON.stringify(cards));
            return { result: `${front} card successfully created.` };
        } catch (error) {
            return { error: error };
        }
    }

    /** Delete a card in a desk. */
    async delete({ deskName, front }) {
        const result = await this.get(deskName);
        if (result.error)
            return result;

        try {
            let cards = result.result;
            for(let i = 0; i < cards.length; i++) {
                if (cards[i].front === front) {
                    cards.splice(i, 1);
                    await AsyncStorage.setItem(deskName, JSON.stringify(cards));
                    return { result: `${front} card successfully deleted.` }; 
                }
            }
            return { error: `${front} card doesn't exist.` };
        } catch (error) {
            return { error: error };
        }
    }
}