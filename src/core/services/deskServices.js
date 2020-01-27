import { DeskRepo, CardRepo } from "../../infrastructure/local/repository";
import Card from "../entity/card";
import Desk from "../entity/desk";
import CardTypes from "../types/cardTypes";
import { DefaultSettings } from "../constraints";

export default class DeskServices {
    async getAllDesks() {
        const result = await DeskRepo.getAll();
        return result;
    }

    async createNewDesk(name, easeBonus = DefaultSettings.EASE_BONUS, intervalModifier = DefaultSettings.INTERVAL_MODIFIER) {
        const result = await DeskRepo.put(new Desk(name, easeBonus, intervalModifier, []));
        return result;
    }

    async deleteDesk(deskName) {
        const result = await DeskRepo.delete(deskName);
        return result;
    }

    /**
     * Add new card into a desk.
     * @param {Desk} desk 
     */
    async addNewCard(desk, {front, back}) {
        if (desk.cardFronts.includes(front))
            return { error: `${desk.name} already has a ${front} card.`};

        const newCard = new Card(front, back, CardTypes.NEW, DefaultSettings.NEW_CARD_EASE, DefaultSettings.NEW_CARD_INTERVAL, null);
        desk.cardFronts.push(front);
        
        const updateDeskResult = await DeskRepo.put(desk);
        if (updateDeskResult.error)
            return updateDeskResult;
        
        const addCardResult = await CardRepo.put(newCard, desk);
        return addCardResult;
    }
}