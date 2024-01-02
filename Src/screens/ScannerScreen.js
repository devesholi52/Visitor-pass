import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Radio from 'react-native-vector-icons/Fontisto';
import { Fonts, Loader } from '../Utils';

const ScannerScreen = ({ navigation }) => {
    useEffect(() => {
        const unsubscribesELLER = navigation.addListener('focus', () => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 500);
            return unsubscribesELLER;
        })
    }, [])

    const [loading, setLoading] = useState(false)
    return (
        <View style={styles.container}>
            {loading && <Loader size={'small'} color={'#000'} />}
            <View style={styles.Maincontainer}>
                <View style={styles.IconTextView}>
                    <View style={styles.radioButtonView}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("HomeScreen")}>
                            <Radio name="radio-btn-passive" size={16} color='#010B6C' />
                        </TouchableOpacity>
                        <Text style={styles.radioText}>Search by Name</Text>
                    </View>
                    <View style={[styles.radioButtonView, { marginLeft: 50 }]}>
                        <Radio name="radio-btn-active" size={16} color='#010B6C' />
                        <Text style={styles.radioText}>Scan QR Code</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.QRText}>QR Code Camera</Text>
            <Text style={styles.text1}>Use the build-in camera scan any QR code.</Text>
            <Text style={styles.text2}>When a code is detected tap the notification or</Text>
            <Text style={styles.text2}>drag down on the notification to view more</Text>
            <Text style={styles.text2}>options.</Text>
            <View style={styles.imageview}>
                <Image source={require("../assets/QRImage.png")}
                    style={styles.image} />
            </View>
        </View>
    )
}

export default ScannerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    Maincontainer: {
        backgroundColor: '#fff',
    },
    IconTextView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20
    },
    radioButtonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioText: {
        paddingLeft: 8,
        color: '#000',
        fontSize: 13,
        fontFamily: Fonts.RobotoMedium,
    },
    QRText: {
        fontSize: 25,
        color: '#fff',
        alignSelf: 'center',
        marginTop: 25,
        fontFamily: Fonts.RobotoMedium,
    },
    text1: {
        alignSelf: 'center',
        color: '#fff',
        marginTop: 10,
        fontSize: 15,
        fontFamily: Fonts.RobotoRegular,
    },
    text2: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 15,
        fontFamily: Fonts.RobotoRegular,
    },
    imageview: {
        height: 235,
        width: 235,
        borderWidth: 3,
        borderColor: '#010B6C',
        alignSelf: 'center',
        marginTop: 80,
        borderRadius: 10
    },
    image: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginTop: 14
    }
})