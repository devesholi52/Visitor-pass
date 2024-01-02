import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Fonts, height, Loader, width } from '../Utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken, setUserDetails } from '../redux/Slices/userSlice';
import { useDispatch } from 'react-redux';
import Lottie from 'lottie-react-native';

const LogoutScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(true);
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const SignOut = async () => {
        await AsyncStorage.clear()
        dispatch(setToken("false"));
        dispatch(setUserDetails("false"));
    };
    useEffect(() => {
        const unsubscribesELLER = navigation.addListener('focus', () => {
            // alert("ndjv")
            setModalVisible(true)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 500);
        })
        return unsubscribesELLER;
    }, [])

    return (
        <>
            {loading && modalVisible && <Loader size={'small'} color={'#000'} />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.containerModal}>
                    <Lottie source={require('../assets/LogOut.json')} autoPlay loop
                        style={styles.lottieImage} />
                    <Text style={styles.text}>Log out</Text>
                    <Text style={styles.textBottom}>You will be return to the login</Text>
                    <Text style={{ alignSelf: 'center', fontSize: 17, color: 'black', marginTop: -3, fontFamily: Fonts.RobotoRegular }}>screen.</Text>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonCancel}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate("HomeScreen")
                            }}
                        >
                            <Text style={styles.buttonTextCancel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLogOut}
                            onPress={SignOut}>
                            <Text style={styles.buttonTextLogout}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* <View style={[styles.container, modalVisible ? { opacity: 0.1 } : "#010B6C"]}>
            </View> */}
        </>
    )
}

export default LogoutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#010B6C',
    },
    lottieImage: {
        height: 140,
        width: 140,
        alignSelf: "center"
    },
    containerModal: {
        height: height / 2.9,
        width: width / 1.3,
        backgroundColor: "#fff",
        alignSelf: 'center',
        borderRadius: 10,
        top: width / 1.6,
        elevation: 2
    },
    text: {
        alignSelf: 'center',
        fontSize: 28,
        color: '#000',
        marginTop: 10,
        fontFamily: Fonts.RobotoMedium
    },
    textBottom: {
        alignSelf: 'center',
        fontSize: 17,
        color: 'black',
        marginTop: 7,
        fontFamily: Fonts.RobotoRegular
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 24
    },
    buttonCancel: {
        borderRightWidth: 1,
        borderTopWidth: 1,
        backgroundColor: "#fff",
        width: width / 2.6,
        paddingVertical: 10,
        borderBottomLeftRadius: 10,
        borderTopColor: "#a9a9a9",
    },
    buttonLogOut: {
        borderTopWidth: 1,
        borderTopColor: "#010B6C",
        backgroundColor: "#010B6C",
        width: width / 2.6,
        paddingVertical: 10,
        borderBottomRightRadius: 10
    },
    buttonTextCancel: {
        alignSelf: 'center',
        color: '#000',
        fontFamily: Fonts.RobotoMedium,
        fontSize: 15
    },
    buttonTextLogout: {
        alignSelf: 'center',
        color: '#fff',
        fontFamily: Fonts.RobotoMedium,
        fontSize: 15
    }
})