import React, { useState, useEffect, useRef } from "react";

import {
	Keyboard,
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight
} from "react-native";

import { DEFAULT_TEXT_VALUE } from "../utils";

type Props = {
	keyPress: string,
	setKeyPress: React.Dispatch<React.SetStateAction<string>>,
}


export const OpenKeyboard = ({ keyPress, setKeyPress }: Props) => {
	const [keyboardShowing, setKeyboardShowing] = useState(false);
	const inputRef = useRef<TextInput>(null);

	useEffect(() => {
		Keyboard.addListener("keyboardDidShow", showKeyboard);
		Keyboard.addListener("keyboardDidHide", hideKeyboard);
		return () => {
			Keyboard.removeListener("keyboardDidShow", showKeyboard);
			Keyboard.removeListener("keyboardDidHide", hideKeyboard);
		};
	}, []);

	useEffect(() => {
		if (keyPress != DEFAULT_TEXT_VALUE) {
			// console.log("Send key " + keyPress + " to server");
			setKeyPress(DEFAULT_TEXT_VALUE);
		}
	}, [keyPress]);

	const showKeyboard = () => setKeyboardShowing(true);
	const hideKeyboard = () => setKeyboardShowing(false);

	const handlePress = () => inputRef.current && inputRef.current.focus();

	return (
		<>
			{ keyboardShowing &&
				<View style={styles.top}>
					<TouchableHighlight
						onPress={Keyboard.dismiss}
						underlayColor="#7A4988"
						style={[styles.center, styles.button]}
					>
						<Text style={{ color: "white" }}>X</Text>
					</TouchableHighlight>
				</View>
			}
			<View>
				<TouchableHighlight
					onPress={handlePress}
					underlayColor="#7A4988"
					style={[styles.center, styles.cornerFloat, styles.button]}
				>
					<Text style={{ color: "white" }}>/\</Text>
				</TouchableHighlight>
			</View>
			<TextInput
				ref={inputRef}
				onChangeText={setKeyPress}
				value={keyPress}
				multiline={true}
				style={[styles.invisible]}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	invisible: {
		display: "none",
	},
	top: {
		position: "absolute",
		top: 50,
		width: "100%",
		alignItems: "center",
	},
	center: {
		alignItems: "center",
		justifyContent: "center"
	},
	cornerFloat: {
		position: "absolute",
		right: 25,
		bottom: 5
	},
	button: {
		width: 50,
		height: 50,
		backgroundColor: "#710193",
		borderRadius: 15
	}
});
