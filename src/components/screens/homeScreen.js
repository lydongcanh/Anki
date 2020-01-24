import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import Toast from "react-native-simple-toast";
import NewDeskDialog from "../molecules/newDeskDialog";
import DeskList from "../organisms/deskList";
import { DeskServices, CardServices } from "../../core/services/services";

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
        if (!deskName || deskName === "")
            return;

        const result = await DeskServices.createNewDesk(deskName);
        
        if (result.error) {
            Toast.show(result.error);
        } else {
            Toast.show(result.result);
            setNewDeskVisible(false);
        }
    }

    function handleNewDeskOnDismiss() {
        setNewDeskVisible(false);
    }

    function handleOnDeskSelected(desk) {
        navigation.navigate("DeskDetails", {desk: desk});
    }

    return (
        <View style={styles.view}>
            <DeskList onDeskSelected={handleOnDeskSelected}/>
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