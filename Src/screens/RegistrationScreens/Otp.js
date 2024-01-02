import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import OtpInputs from 'react-native-otp-inputs';
import { CodeField, useBlurOnFulfill, useClearByFocusCell, Cursor } from "react-native-confirmation-code-field";
import { Fonts, height, width } from '../../Utils';

export default function Otp({ navigation }) {


    const CELL_COUNT = 4;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT, });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    return (
        <View style={styles.Container}>
            <Image source={require('../../assets/ducis-logo2.png')} resizeMode="contain" style={styles.imageTop} />
            <View style={{ marginLeft: 40 }}>
                <Text style={styles.VerificationText}>Verification</Text>
                <Text style={{ color: "grey", fontFamily: Fonts.RobotoRegular, fontSize: 15 }}>We have sent the OTP on your mobile number </Text>
            </View>
            <View style={styles.otpInputStyle}>
                {/* <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={4}
          inputStyles={styles.inputStyles}
          inputContainerStyles={styles.containerstyle}
          placeholder="0"
          placeholderTextColor={Color.blue}
        /> */}

                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="numeric"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <View
                            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                            onLayout={getCellOnLayoutHandler(index)}
                            key={index}
                            style={[styles.cellRoot, isFocused && styles.focusCell]}>
                            <Text style={styles.cellText}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                    )}
                />

            </View>
            <View style={styles.resendOTP}>
                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, fontFamily: Fonts.RobotoRegular, color: '#000' }}>If you did not receive a code</Text>
                <Text style={{ fontFamily: 'Roboto-Medium', color: "#010B6C", fontSize: 16, marginLeft: 4 }}>Resend</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Passwordreset')}>
                <Text style={{ color: "white", fontFamily: 'Roboto-Medium', fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    otpInputStyle: {
        flexDirection: 'row',
        marginHorizontal: 50,
        marginTop: 60,
    },
    title: {
        textAlign: 'center',
        // paddingTop: 30,
        fontFamily: 'BERNIERShade-Regular',
        fontSize: 33,
        color: "blue"

    },
    VerificationText: {
        fontSize: 22,
        fontFamily: Fonts.RobotoBold,
        color: '#000',
        marginBottom: 5
    },
    text: {
        textAlign: 'center',
        fontFamily: Fonts.RobotoRegular,
        fontSize: 22,
        color: "black",

        marginTop: 20
    },
    inputStyles: {
        color: "black",
        fontSize: 15,
        textAlign: 'center'
    },
    containerstyle: {
        borderWidth: 1,
        borderColor: "#010B6C",
        paddingHorizontal: 10,
        margin: 12,
        marginTop: height / 8
    },

    resendOTP: {
        flexDirection: 'row',
        marginBottom: height / 14,
        marginTop: 30,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: "#010B6C",
        padding: 14,
        paddingHorizontal: width / 2.6,
        borderRadius: 14,
        alignSelf: 'center',
        elevation: 3,
        marginTop: 50
    },
    imageTop: {
        height: 70,
        width: 130,
        alignSelf: 'center',
        marginTop: width / 4.5,
        marginBottom: width / 7
    },
    codeFieldRoot: {
        marginVertical: 10,
        width: width - 70,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    cellRoot: {
        width: width / 6,
        height: width / 7,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        backgroundColor: '#010B6C',
        borderRadius: 9,
        elevation: 4
    },
    cellText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: Fonts.RobotoMedium,
        // fontFamily: Font.Bold
    },
    focusCell: {
        borderBottomColor: "white",
        borderBottomWidth: 2,
    },



})