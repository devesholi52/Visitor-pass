import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Fonts, width } from '../../Utils'
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/AntDesign';


const Passwordreset = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [isOpenUp, setIsOpenUp] = useState(true)
    return (
        <View style={styles.Container}>
            <Image source={require('../../assets/ducis-logo2.png')} style={styles.imageTop} />
            <View style={styles.TextContainer}>
                <Text style={styles.SignInText}>Reset Password</Text>
                <Text style={styles.Text}>Let's create new password</Text>
            </View>

            <View >
                <TextInput placeholder='Enter new Password' placeholderTextColor={'gray'}
                    style={styles.inputBox}
                    label='Enter new Password'
                    secureTextEntry={isOpen}
                    keyboardType="default"
                    underlineColor={'transparent'}
                    left={<TextInput.Icon name="lock" color={"#010B6C"} size={20} style={{ marginTop: 10 }} />}
                    theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#000' } }}
                />

                <TouchableOpacity style={{ position: 'absolute', top: 47, right: 40 }}>
                    <Icon name={"eye"} color={isOpen ? '#010B6C' : "#777777"} size={20}
                        onPress={() => setIsOpen(!isOpen)} />
                </TouchableOpacity>

            </View>

            <View >
                <TextInput placeholder='Re-enter new Password' placeholderTextColor={'gray'}
                    style={styles.inputBox}
                    label='Re-enter new Password'
                    secureTextEntry={isOpenUp}
                    keyboardType="default"
                    underlineColor={'transparent'}
                    left={<TextInput.Icon name="lock" color={"#010B6C"} size={20} style={{ marginTop: 10 }} />}
                    theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#000' } }}
                />

                <TouchableOpacity style={{ position: 'absolute', top: 47, right: 40 }}>
                    <Icon name={"eye"} color={isOpenUp ? '#010B6C' : "#777777"} size={20}
                        onPress={() => setIsOpenUp(!isOpenUp)} />
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate("Signin")}>
                <Text style={styles.buttonText}>Password Update</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Passwordreset

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    imageTop: {
        height: 50,
        width: 130,
        alignSelf: 'center',
        marginTop: width / 4.5
    },
    TextContainer: {
        marginTop: 60,
        marginBottom: 30,
        marginLeft: 30
    },
    SignInText: {
        fontSize: 20,
        fontFamily: Fonts.RobotoBold,
        color: '#000'
    },
    Text: {
        fontSize: 16,
        fontFamily: Fonts.RobotoRegular,
        color: 'grey'
    },
    button: {
        alignSelf: "center",
        backgroundColor: '#010B6C',
        marginTop: width / 4,
        paddingHorizontal: width / 3.4,
        paddingVertical: 14,
        borderRadius: 7
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: Fonts.RobotoMedium,
    },
    inputBox: {
        fontSize: 14,
        backgroundColor: "#F4F6FF",
        fontFamily: Fonts.RobotoRegular,
        marginHorizontal: 24,
        borderRadius: 5,
        marginTop: 25,
        paddingLeft: 10

    },
})