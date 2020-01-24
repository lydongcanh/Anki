import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { DataTable, ActivityIndicator } from "react-native-paper";
import { CardServices } from "../../core/services/services";
import Toast from "react-native-simple-toast";

export default function CardList(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const [error, setError] = useState("");

    const styles = StyleSheet.create({
        indicator: {
            padding: 10
        }
    });

    useEffect(() => {
        async function loadCards() {
            setIsLoading(true);

            const result = await CardServices.getAllCards(props.desk);
            if (result.error) {
                setError(result.error);
            } else {
                setCards(result.result);
            }

            Toast.show(JSON.stringify(props.desk) + JSON.stringify(cards));

            setIsLoading(false);
        }

        loadCards();
    }, [props]);

    const tableRows = () => {
        if (error !== "")
            return [];

        if (isLoading || !cards)
            return <ActivityIndicator style={styles.indicator} animating/>

        const rows = [];
        for (const card of cards) {
            rows.push(
                <DataTable.Row>
                    <DataTable.Cell>{card.front}</DataTable.Cell>
                    <DataTable.Cell>{"Back"}</DataTable.Cell>
                    <DataTable.Cell>{card.type}</DataTable.Cell>
                    <DataTable.Cell>{card.ease}</DataTable.Cell>
                    <DataTable.Cell>{card.interval}</DataTable.Cell>
                    <DataTable.Cell>{card.lastReviewTime.toDateString()}</DataTable.Cell>
                </DataTable.Row>
            );
        }
        return rows;
    }

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Front</DataTable.Title>
                <DataTable.Title>Back</DataTable.Title>
                <DataTable.Title>Type</DataTable.Title>
                <DataTable.Title>Ease</DataTable.Title>
                <DataTable.Title>Interval</DataTable.Title>
                <DataTable.Title>Last Review</DataTable.Title>
            </DataTable.Header>
            {tableRows()}
        </DataTable>
    )
}