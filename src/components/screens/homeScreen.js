import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import Toast from "react-native-simple-toast";
import NewDeskDialog from "../molecules/newDeskDialog";
import DeskList from "../organisms/deskList";
import { DeskServices, CardServices } from "../../core/services/services";
import { ScreenNames } from "../../core/constraints";

export default function HomeScreen(props) {
    const [newDeskVisible, setNewDeskVisible] = useState(false);
    const [desks, setDesks] = useState([]);

    const navigation = props.navigation;
    const styles = StyleSheet.create({
        view: {
            flex: 1,
        },
        plusIcon: {
            position: "absolute",
            bottom: 16,
            right: 16,
            margin: 16
        }
    });

    useEffect(() => {
        async function loadDesks() {
            const result = await DeskServices.getAllDesks();
            setDesks(result.result);
        }

        loadDesks();
    }, []);

    async function handleNewDeskOnOk(deskName) {
        if (!deskName || deskName === "")
            return;

        const result = await DeskServices.createNewDesk(deskName);
        
        if (result.error) {
            Toast.show(result.error);
        } else {
            setDesks([...desks, result.result]);
            setNewDeskVisible(false);
            Toast.show(`${result.result.name} is created.`);
        }
    }

    function handleNewDeskOnDismiss() {
        setNewDeskVisible(false);
    }

    function handleOnDeskSelected(desk) {
        navigation.navigate(ScreenNames.DESK_DETAILS, {desk: desk});
    }

    async function handleOnDeskDelete(desk) {
        await DeskServices.deleteDesk(desk.name);
        for (const cardFront of desk.cardFronts) {
            await CardServices.deleteCard(cardFront);
        }

        const newDesks = [...desks];
        const removeIndex = newDesks.indexOf(desk);
        if (removeIndex != -1)
            newDesks.splice(removeIndex, 1);
        setDesks(newDesks);

        Toast.show(`${desk.name} is deleted.`);
    }

    function handleGoToCreateCardScreen(desk) {
        navigation.navigate(ScreenNames.CREATE_CARD, {desk: desk});
    }

    return (
        <View style={styles.view}>
            <DeskList 
                desks={desks}
                getAllDesksFunc={async () => await DeskServices.getAllDesks()}
                deleteDeskFunc={handleOnDeskDelete}
                onDeskSelected={handleOnDeskSelected}
                goToCreateCardsFunc={handleGoToCreateCardScreen}
            />
            <FAB 
                style={styles.plusIcon}
                icon="plus"
                onPress={() => setNewDeskVisible(true)}
            />
            <NewDeskDialog 
                visible={newDeskVisible}
                onOk={handleNewDeskOnOk}
                onDismiss={handleNewDeskOnDismiss}
            />
        </View>
    );
}