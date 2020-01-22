import React from 'react';
import { Provider } from "react-native-paper";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/components/screens/homeScreen";
import CreateCardScreen from "./src/components/screens/createCardScreen";

const MainNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    CreateCard: { screen: CreateCardScreen, navigationOptions: { title: "New Card" } }
});

const Navigation = createAppContainer(MainNavigator);

export default function App() {
    return (
        <Provider>
            <Navigation />
        </Provider>
    );
}
