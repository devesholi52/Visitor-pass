import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { TextInput } from "react-native-paper";
import { Fonts, width } from '../../Utils'
import Icon from 'react-native-vector-icons/AntDesign'
import Appurl from "../../API/Constant"

const Forgetpass = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState("")

    const ForgetPassword = () => {
        const form = new FormData()
        form.append("email", email)
        fetch(Appurl.FORGETPASSWORD,
            {
                method: "POST",
                body: form
            }).then(res => res.json())
            .then(
                response => {
                    console.log("response", response);
                }
            )
    }
    return (
        <View style={styles.Container}>
            <Image source={require('../../assets/ducis-logo2.png')} style={styles.imageTop} />
            <View style={styles.TextContainer}>
                <Text style={styles.SignInText}>Forget Password</Text>
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.Text}>Enter the mobile number associated with your account</Text>
                    <Text style={styles.Text}>account</Text>
                </View>
            </View>

            <TextInput placeholder='Email Mobile Number' placeholderTextColor={'gray'}
                style={styles.inputBox}
                label='Email Mobile Number'
                secureTextEntry={isOpen}
                value={email}
                onChangeText={setEmail}
                keyboardType="default"
                underlineColor={'transparent'}
                left={<TextInput.Icon name="cellphone" color={"#010B6C"} size={20} style={{ marginTop: 10 }} />}
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#000' } }}
            />
            <TouchableOpacity style={styles.button}
                onPress={ForgetPassword}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Forgetpass

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
        marginTop: width / 4.5,
        marginBottom: 30,
        marginLeft: 30
    },
    SignInText: {
        fontSize: 22,
        fontFamily: Fonts.RobotoBold,
        color: '#000',
        marginBottom: 6
    },
    Text: {
        fontSize: 16,
        fontFamily: Fonts.RobotoRegular,
        color: 'grey'
    },
    button: {
        alignSelf: "center",
        backgroundColor: '#010B6C',
        marginTop: width / 3,
        paddingHorizontal: width / 2.7,
        paddingVertical: 14,
        borderRadius: 7
    },
    buttonText: {
        color: '#fff',
        fontFamily: Fonts.RobotoMedium,
        fontSize: 18
    },
    inputBox: {
        fontSize: 14,
        backgroundColor: "#F4F6FF",
        fontFamily: Fonts.RobotoRegular,
        marginHorizontal: 24,
        borderRadius: 5,
        // borderWidth: 1,
        marginTop: 25,
        paddingLeft: 7

    },
})