export default class Desk {
    /**
     * @param {string} _name Unique, used to generate id.
     * @param {number} _easeBonus Bonus when user get an "easy" answer.
     * @param {number} _intervalModifier 
     * @param {string} _cardIds Ids of all the cards in this desk.
     */
    Desk(_name, _easeBonus, _intervalModifier, _cardIds) {
        this.name = _name;
        this.easeBonus = _easeBonus;
        this.intervalModifier = _intervalModifier;
        this.cardIds = _cardIds;
    }
}
