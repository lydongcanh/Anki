import { AsyncStorage } from "react-native";
import { DESK_PREFIX_ID } from "../../core/constraints";

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

    /** Get a desk with its unique name. */
    async get(deskName) {
        try {
            const deskString = await AsyncStorage.getItem(DESK_PREFIX_ID + deskName);
            if (!deskString)
                return { error: `${deskName} doesn't exists.` };

            const desk = JSON.parse(deskString);
            return { result: desk };
        } catch (error) {
            return { error: error };
        }
    }

    /** Create new or update a desk if it already exists. */
    async put(desk) {
        try {
            await AsyncStorage.setItem(DESK_PREFIX_ID + desk.name, JSON.stringify(desk));
            return { result: `${desk.name} desk is put.` };
        } catch (error) {
            return { error: error };
        }
    }

    /** Delete a desk with its unique name. */
    async delete(deskName) {
        try {
            const existDesk = await AsyncStorage.getItem(DESK_PREFIX_ID + deskName);
            if (!existDesk)
                return { error: `${deskName} desk doesn't exist.` };

            await AsyncStorage.removeItem(DESK_PREFIX_ID + deskName);
            return { result: `${deskName} desk is deleted.` }; 
        } catch (error) {
            return { error: error };
        }
    }
}