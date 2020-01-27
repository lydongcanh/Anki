import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, List, IconButton } from "react-native-paper";

/**
 * 
 * @param {*} props isLoading, cards, async deleteCardFunc(card, desk)
 */
export default function CardList(props) {

    const styles = StyleSheet.create({
        indicator: {
            padding: 10
        },
        item: {
            borderRadius: 8
        }
    });

    const listItems = () => {
        if (props.isLoading || !props.cards)
            return <ActivityIndicator style={styles.indicator} animating />

        const items = [];
        for (const card of props.cards) {
            items.push(
                <List.Item
                    style={styles.item}
                    key={card.front}
                    title={card.front}
                    description={card.back}
                    right={() => <IconButton icon="delete" onPress={async () => props.deleteCardFunc(card, props.desk)}/>}
                />
            );
        }
        return items;
    }

    return (
        <ScrollView>
            <List.Section>
                {listItems()}
            </List.Section>
        </ScrollView>
    )
}
