import React, {useState} from "react";
import { Dialog, Portal, TextInput, Button } from "react-native-paper";

/**
 * @param {*} props visible, {async} onOk, onDismiss.
 */
export default function NewDeskDialog(props) {
    const [deskName, setDeskName] = useState("");

    function handleOnDismiss() {
        setDeskName("");
        props.onDismiss();
    }

    async function handleOnOk() {
        setDeskName("");
        await props.onOk(deskName);
    }

    return (
        <Portal>
            <Dialog 
                onDismiss={handleOnDismiss}
                visible={props.visible}
            >
                <Dialog.Title>New Desk</Dialog.Title>
                <Dialog.Content>
                    <TextInput 
                        label="Name"
                        mode="outlined"
                        value={deskName}
                        onChangeText={text => setDeskName(text)}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleOnOk}>Ok</Button>
                    <Button onPress={handleOnDismiss}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}