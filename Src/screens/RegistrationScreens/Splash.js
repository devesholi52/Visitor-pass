import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { height, width } from '../../Utils'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Signin")
        }, 1000);
    }, [])

    return (
        <ImageBackground
            source={require("../../assets/SplashScreen.jpg")}
            style={styles.imageContainer}>
            <View style={styles.CircleMiddle}>
                <Image source={require('../../assets/ducis-logo2.png')} style={styles.image} />
            </View>
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    imageContainer: {
        height: 850,
        width: width,
    },
    CircleMiddle: {
        backgroundColor: "#fff",
        height: 250,
        width: 250,
        borderRadius: 200,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: height / 3.3,
    },
    image: {
        height: 100,
        width: 180,
        marginTop: 75
    }
})