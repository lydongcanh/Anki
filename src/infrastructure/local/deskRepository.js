import { AsyncStorage } from "react-native";
import Desk from "../../core/entity/desk";

const DESK_PREFIX_ID = "DESK";

export default class DeskRepository {

    /** Get all desks. */
    async getAll() {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            
            const desks = [];
            for(const key of allKeys) {
                if (key.startsWith(DESK_PREFIX_ID)) {
                    const deskString = await AsyncStorage.getItem(key);
                    desks.push(JSON.parse(deskString));
                }
            }

            return { result: desks };
        } catch (error) {
            return { error: error };
        }
    }

    /**
     * Create new desk.
     * @param {Desk} desk 
     */
    async create(desk) {
        try { 
            const deskId = DESK_PREFIX_ID + desk.name;
            const existDesk = await AsyncStorage.getItem(deskId);

            if (existDesk !== null)
                return { error: `${desk.name} desk already exists.` };

            await AsyncStorage.setItem(deskId, JSON.stringify(desk));
            return { result: `${desk.name} desk is created.` };
        } catch (error) {
            return { error: error };
        }
    }

    /** Delete a desk with its name. */
    async delete(deskName) {
        try {
            await AsyncStorage.removeItem(DESK_PREFIX_ID + deskName);
            return { result: `${deskName} desk is deleted.` }; 
        } catch (error) {
            return { error: error };
        }
    }
}