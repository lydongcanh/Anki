import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, List, IconButton, Surface } from "react-native-paper";

/**
 * @param {*} props desks, onDeskSelected(desk), async deleteDeskFunc(desk), goToCreateCardsFunc(desk)
 */
export default function DeskList(props) {

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

    let list = () => {
        // if (isLoading)
        //     return <ActivityIndicator style={styles.indicator} animating={true} />

        return (
            <ScrollView>
                <List.Section title="Desks">
                    {listItems()}
                </List.Section>
            </ScrollView>
        );
    }

    let listItems = () => {
        
        if (!props.desks || props.desks.length < 1)
            return [];

        const listItems = [];
        for (const desk of props.desks) {
            if (!desk) {
                console.log("Null desk!!!");
                continue;
            }

            listItems.push(
                <Surface key={desk.name} style={styles.listItemSurface}>
                    <List.Item
                        style={styles.listItem}
                        onPress={() => props.onDeskSelected(desk)}
                        right={_ => deskRightIcons(desk)}
                        key={desk.name}
                        title={desk.name}
                    />
                </Surface>
            );
        }
        return listItems;
    };


    let deskRightIcons = (desk) => {
        const icons = [];
        icons.push(<IconButton key="delete" icon="delete" onPress={async () => await props.deleteDeskFunc(desk) }/>);
        icons.push(<IconButton key="plus" icon="plus" onPress={() => props.goToCreateCardsFunc(desk)} />);
        return icons;
    }
    
    return list();
}