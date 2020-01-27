import { CardRepo } from "../../infrastructure/local/repository";
import Card from "../entity/card";
import Desk from "../entity/desk";
import CardTypes from "../types/cardTypes";
import { addDays } from "../utilities";

export default class CardServices {
    
    /**
     * Get all cards in a desk.
     * @param {Desk} desk 
     */
    async getAllCards(desk) {
        const cards = [];
        for(const cardFront of desk.cardFronts) {
            const card = await CardRepo.get(cardFront, desk);
            cards.push(card);
        }
        return cards;
    }

    /**
     * Get all due cards in a desk.
     * @param {Desk} desk 
     * @param {Date} dueDate
     */
    async getDueCards(desk, dueDate = new Date()) {
        const dueCards = [];
        for(const cardFront of desk.cardFronts) {
            const card = await CardRepo.get(cardFront, desk);
            if (this.isDueCard(card, dueDate))
                dueCards.push(card);
        }
        return dueCards;
    }

    /**
     * @param {Card} card 
     * @param {Date} dueDate
     */
    isDueCard(card, dueDate) {
        if (!card)
            return false;

        if (card.type === CardTypes.NEW || 
            card.type === CardTypes.RELEARNING ||
            card.interval <= 0 ||
            card.lastReviewTime === null)
            return true;

        return addDays(card.lastReviewTime, card.interval) < dueDate;
    }

    async deleteCard(cardFront, desk) {
        return CardRepo.delete(cardFront, desk);
    }
}