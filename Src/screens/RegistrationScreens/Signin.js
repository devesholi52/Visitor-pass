import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { Fonts, showToastMessage, width } from '../../Utils'
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserDetails } from '../../redux/Slices/userSlice';
import { Login } from '../../API';
import Appurl from "../../API/Constant"

const Signin = ({ navigation }) => {

    const dispatch = useDispatch()
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const Login = () => {
        // setLoading(true)
        if (!email || !password) { showToastMessage('Please fill in'); return }
        let form = new FormData()
        form.append('username', email)
        form.append('password', password)
        fetch(Appurl.LOGIN, {
            method: 'POST',
            body: form
        }).then(res => res.json())
            .then(response => {
                console.log("response", response);
                if (response && response?.detail == "Incorrect authentication credentials.") { showToastMessage('Please enter correct Username or Password'); }
                if (response && response?.key) {
                    dispatch(setToken(response?.key));
                    dispatch(setUserDetails(response));
                    // AsyncStorage.setItem('token', response)
                    AsyncStorage.setItem('token', response?.key)
                }
            })
        // .finally(e => setLoading(false))
    }

    const [isOpen, setIsOpen] = useState(true)

    return (
        <View style={styles.Container}>
            <Image source={require('../../assets/ducis-logo2.png')} style={styles.imageTop} />
            <View style={styles.TextContainer}>
                <Text style={styles.SignInText}>Sign in</Text>
                <Text style={styles.Text}>Please fill in the credentials</Text>
            </View>


            <TextInput placeholder='Email/Mobile' placeholderTextColor={'gray'}
                style={styles.inputBox}
                label='Employe Id'
                value={email}
                onChangeText={setemail}
                underlineColor={'transparent'}
                left={<TextInput.Icon name="account" color={"#010B6C"} size={20} style={{ marginTop: 10 }} />}
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#000' } }}
            />

            <View >
                <TextInput placeholder='Enter Password' placeholderTextColor={'gray'}
                    style={styles.inputBox}
                    label='Enter Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={isOpen}
                    underlineColor={'transparent'}
                    left={<TextInput.Icon name="lock" color={"#010B6C"} size={20} style={{ marginTop: 10 }} />}
                    theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#000' } }}
                />

                <TouchableOpacity style={{ position: 'absolute', top: 47, right: 40 }}>
                    <Icon name={"eye"} color={isOpen ? '#010B6C' : "#777777"} size={20}
                        onPress={() => setIsOpen(!isOpen)} />
                </TouchableOpacity>

            </View>
            {/* <TouchableOpacity
                onPress={() => navigation.navigate("Forgetpass")}>
                <Text style={styles.ForgetPassText}>Forget Password?</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button}
                onPress={Login}
            >
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signin

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
    ForgetPassText: {
        marginTop: 13,
        marginLeft: 27,
        color: '#000',
        fontFamily: Fonts.RobotoMedium,
    },
    button: {
        alignSelf: "center",
        backgroundColor: '#010B6C',
        marginTop: width / 4,
        paddingHorizontal: width / 2.7,
        paddingVertical: 14,
        borderRadius: 7,
        elevation: 3
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