import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react-native';
import { height } from '../Utils';
import { StackActions } from '@react-navigation/native';

const RegisteredLottie = ({ navigation }) => {

    const popAction = StackActions.pop(1);

    useEffect(() => {
        setTimeout(() => {
            // navigation.navigate("VisitorHistory")
            navigation.dispatch(popAction);
        }, 2720);
    }, [])

    return (
        <Modal style={styles.container}>
            <Lottie source={require('../assets/Registered.json')} autoPlay loop
                style={styles.lottieImage} />
        </Modal>
    )
}

export default RegisteredLottie

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    lottieImage: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        marginTop: height / 7
    },
})