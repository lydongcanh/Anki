import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import NewDeskDialog from "../molecules/newDeskDialog";
import DeskList from "../organisms/deskList";
import { DeskRepo } from "../../infrastructure/local/repository";
import Desk from "../../core/entity/desk";

export default function HomeScreen(props) {
    const [newDeskVisible, setNewDeskVisible] = useState(false);

    const navigation = props.navigation;
    const styles = StyleSheet.create({
        view: {
            flex: 1,
            //alignItems: "center",
            //justifyContent: "center"
        },
        plusIcon: {
            position: "absolute",
            bottom: 16,
            right: 16,
            margin: 16
        }
    });

    async function handleNewDeskOnOk(deskName) {
        await DeskRepo.create(new Desk(deskName, 1.3, 1, []));
        setNewDeskVisible(false);
        navigation.navigate("CreateCard", {defaultDesk: deskName});
    }

    function handleNewDeskOnDismiss() {
        setNewDeskVisible(false);
    }

    return (
        <View style={styles.view}>
            <DeskList />
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