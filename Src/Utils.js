import React from 'react'
import { Dimensions, View, StyleSheet, ToastAndroid } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
// import { Icon, Text } from 'react-native-elements';
// import Toast from 'react-native-simple-toast';

export const { height, width } = Dimensions.get('window');
export const Fonts = {
    RobotoRegular: 'Roboto-Regular',
    RobotoBold: 'Roboto-Bold',
    RobotoMedium: 'Roboto-Medium',
    RobotoThin: 'Roboto-Thin',
    RobotoLight: 'Roboto-Light'
}

export const staticImage = 'https://via.placeholder.com/150'
export const dataGender = [
    { key: "1", label: "male" },
    { key: "2", label: "Female" },
]

export const dataIdType = [
    { key: "1", label: "Passport" },
    { key: "2", label: "Driving Licence" },
    { key: "3", label: "Voter ID" },
    { key: "4", label: "Aadhar Card" },
]

export const dataWhomToMeet = [
    { key: "1", label: "Neha singh(EMPL 2323)" },
    { key: "2", label: "rakesh singh(EMPL 2323)" },
    { key: "3", label: "vinay pathak(EMPL 2323)" },
    { key: "4", label: "ranjan kumar(EMPL 2323)" },
]
export const dataPurpose = [
    { key: "1", label: "meetings" },
    { key: "2", label: "interview" },
    { key: "3", label: "others" },
]

export const Loader = () => {
    setTimeout(() => {
        <Spinner size="large" visible={false} />
    }, 4000);
    return <Spinner size="large" visible={true} />
};
export const mobileValidation = (number) => {
    if (number.length < 10) {
        return false
    }
    else {
        return true
    }
}

export const showToastMessage = (text = '') => {
    // if (Platform.OS == 'ios') {
    //     return Toast.showWithGravity(text, Toast.LONG, Toast.BOTTOM);
    // } else {
    // }
    ToastAndroid.show(text, ToastAndroid.SHORT)

}


export const Color = {
    primaryColor: '#f86a9c',
    buttoncolor: '#dc3545',
    center_tab: '#ead395',
    darkGrey: '#cfcfcf',


    fbdark: '#07a5d4',
    offWhite: '#f7f7f7',
    black: '#222',
    mainBlack: '#222',
    mainGrey: '#ececec',
    lightShadow: 'rgba(0,0,0,0.5)',
    darkShadow: 'rgba(0,0,0,0.5)',
    blue: '#4255a7',
    indigo: '#6610f2',
    purple: '#6f42c1',
    pink: '#e83e8c',
    red: '#dc3545',
    orange: '#fd7e14',
    yellow: '#ffc107',
    green: '#28a745',
    teal: '#00C853',
    cyan: '#17a2b8',
    white: '#ffffff',
    // white: '#fefff3',
    gray: '#6c757d',
    gray_dark: '#343a40',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    light: '#f8f9fa',
    dark: '#343a40',
    fb: '#3b5999',
    iconColor: '#9E9E9E',
    twitter: '#55aded',
    gmail: '#d24937',
}
    ;

export const Font =
{
    Medium: 'Roboto-Medium',
    Bold: 'Roboto-Bold',
    Regular: 'Roboto-Regular'
};

export const IMAGES = {
    HOME_ACTIVE: "home",
    DEAL_ACTIVE: "handshake-o",
    FAVOURITE_ACTIVE: "heart",
    NOTIFICATION_ACTIVE: "bell",
    PROFILE_ACTIVE: "user",

}

export const NewsView = ({ title = '', description = '', description1 = '',
    commentTitle = '', commentDiscription = '', commentDiscription1 = '' }) => (
    <View style={{ alignItems: 'flex-start', padding: 10 }}>
        <Text style={styles.titleNews}>{title}</Text>
        <Text style={styles.descNews}>{description}</Text>
        <Text style={styles.descNews}>{description1}</Text>
    </View>)

const styles = StyleSheet.create({
    titleNews: {
        fontSize: 15,
        color: Color.mainBlack,
        paddingHorizontal: 10,
        textAlign: 'left',
        marginBottom: 8,
        fontFamily: Font.Medium
    },
    descNews: {
        fontSize: 13,
        color: Color.gray,
        paddingHorizontal: 10,
        lineHeight: 20,
        fontFamily: Font.Regular
    }
})