import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, List, Surface } from "react-native-paper";
import { DeskRepo } from "../../infrastructure/local/repository";

export default function DeskList(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [desks, setDesks] = useState([]);

    const styles = StyleSheet.create({
        indicator: {
            margin: 16
        },
        listItemSurface: {
            margin: 8,
            borderRadius: 12
        },
        listItem: {
            borderRadius: 12
        }
    });

    useEffect(() => {
        async function loadDesks() {
            setIsLoading(true);

            const result = await DeskRepo.getAll();

            if (result.error)
                setError(result.error);
            else
                setDesks(result.result);
                
            setIsLoading(false);
        }

        loadDesks();
    }, [props]);

    let list = () => {
        if (isLoading)
            return <ActivityIndicator style={styles.indicator} animating={true}/>

        return (
            <List.Section title="Desks">
                {listItems()}
            </List.Section>
        );
    }

    let listItems = () => {
        if (error !== "")
            return (
                <Surface style={styles.listItemSurface}>
                    <List.Item style={styles.listItem} title="Error" description={error} />
                </Surface>
            )

        const listItems = [];
        for(const desk of desks) {
            listItems.push(
                <Surface key={desk.name} style={styles.listItemSurface}>
                    <List.Item style={styles.listItem} onPress={() => {}} key={desk.name} title={desk.name}/>
                </Surface>
            );
        }
        return listItems;
    };

    return list();
}