import React from "react";
import { StyleSheet } from "react-native";
import { Paragraph } from 'react-native-paper';

/**
 * @param {*} props [navigation: defaultDesk]
 */
export default function CreateCardScreen(props) {
    const { navigation } = props;
    
    const styles = StyleSheet.create({
        a: {
            alignItems: "center"
        }
    });

    return (
        <Paragraph style={styles.a}>
            {navigation.getParam("defaultDesk", "Noobs")}
        </Paragraph>
    );
}