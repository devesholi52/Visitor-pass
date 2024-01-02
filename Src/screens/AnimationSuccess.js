import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react-native';
import { height } from '../Utils';

const AnimationSuccess = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("VisitorHistory")
        }, 2500);
    }, [])

    return (
        <Modal style={styles.container}>
            <Lottie source={require('../assets/8580-done.json')} autoPlay loop
                style={styles.lottieImage} />
        </Modal>
    )
}

export default AnimationSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    lottieImage: {
        height: 300,
        width: 300,
        alignSelf: 'center',
        marginTop: 100
    },
})