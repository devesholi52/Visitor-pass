import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, FlatList, Alert, Image, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput as MaterialTextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import Icon from 'react-native-vector-icons/AntDesign';
import Radio from 'react-native-vector-icons/Fontisto';
import Search from 'react-native-vector-icons/Ionicons';
import { dataGender, dataIdType, dataPurpose, dataWhomToMeet, Fonts, height, Loader, mobileValidation, showToastMessage, staticImage, width } from '../Utils';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Lottie from 'lottie-react-native';
import Appurl from "../API/Constant"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const HomeScreen = ({ navigation }) => {

    const token = useSelector(state => state?.user?.token ? state.user.token : '')

    useEffect(() => {
        const unsubscribesELLER = navigation.addListener('focus', () => {
            setLoading(true)
            if (token) {
                getEmployee()
            }
            handleSearchMobile()
            setTimeout(() => {
                setLoading(false)
            }, 500);
            return unsubscribesELLER;
        })
    }, [isChanged])


    const [loading, setLoading] = useState(false)
    const [cover, setCover] = useState({
        value: null,
        error: ''
    })
    const [isChanged, setIsChanged] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [gender, setGender] = useState("")
    const [idType, setIdType] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [toMeet, setToMeet] = useState("")
    const [purpose, setPurpose] = useState("")
    const [CheckInTime, setCheckInTime] = useState("")
    const [CheckInDate, setCheckInDate] = useState("")
    const [employee, setEmployee] = useState([])
    const [serachMobile, setSearchMobile] = useState('')
    const [dummyItemList, setDummyItemList] = useState([])
    console.log(gender);
    console.log(mobileNumber);
    console.log(idType);


    const getEmployee = async () => {
        fetch(Appurl.ADDVISITOR, {
            method: 'GET',
            headers: { Authorization: `Token ${token}` },
        }).then(res => res.json())
            .then(response => {
                let data = []
                if (response) {
                    response?.forEach(item => {
                        let localData = { label: item.name, value: item.id }
                        data.push(localData)
                    });
                    setEmployee(data)
                }
            })
            // .catch(e => showToastMessage('Something went wrong'))
            .finally(e => setLoading(false))
    }

    const handleSearchMobile = async (text) => {
        setSearchMobile(text);
        if (text && text.length == 10) {
            setLoading(true)
            console.log(`${Appurl.VISITEDMOBILENUMBER}${text}/`);
            fetch(`${Appurl.VISITEDMOBILENUMBER}${text}/`, {
                method: 'GET',
                redirect: 'follow',
                headers: {
                    Authorization: `Token ${token}`,
                    "Cookie": "csrftoken=qKHxTMxrcC7GorETwnnUhYxntfPlyyAcjTveTEsPJ1AAgGKEatqYaQDmxWZCpBku; sessionid=o8rixih13rhssrnxmpn03hw849dzpxl4",
                },
            }).
                then(res => res.json())
                .then(response => {
                    console.log("rersponsedededed", response);
                    if (response && response.length !== 0) {
                        setFirstName(response[0]?.visitor_name)
                        setMobileNumber(response[0]?.phone)
                        setGender(response[0]?.gender)
                        setIdNumber(response[0]?.identity_number)
                        setIdType(response[0]?.identity_type)
                        setPurpose(response[0]?.purpose)
                        setIsChanged(!isChanged)
                    }
                }).finally(e => setLoading(false))
        }
    }

    const Submit = async () => {
        if (!firstName) { showToastMessage('please fill in'); return }
        if (!mobileNumber) { showToastMessage('please fill in'); return }
        if (!mobileValidation(mobileNumber)) {
            showToastMessage("Number Should not be less then 10."); return
        }
        if (!gender) { showToastMessage('please fill in'); return }
        if (!idType) { showToastMessage('please fill in'); return }
        if (!idNumber) { showToastMessage('please fill in'); return }
        if (!toMeet) { showToastMessage('please fill in'); return }
        if (!purpose) { showToastMessage('please fill in'); return }
        if (!CheckInTime) { showToastMessage('please fill in'); return }
        if (!CheckInDate) { showToastMessage('please fill in'); return }
        setLoading(true)
        const token = await AsyncStorage.getItem('token')
        console.log("token______", token);
        let form = new FormData()
        form.append('visitor_name', firstName || '')
        form.append('phone', mobileNumber || '')
        form.append('description', gender || '')
        form.append('identity_type', idType || '')
        form.append('identity_number', idNumber || '')
        if (cover.value) form.append('image', cover.value)
        form.append('host', toMeet || '')
        form.append('purpose', purpose || '')
        form.append('visit_date', CheckInDate || '')
        form.append('visit_time', CheckInTime || '')
        console.log("form", form);
        fetch(Appurl.VISITORDATA, {
            method: 'POST',
            headers: { Authorization: `Token ${token}` },
            body: form
        }).then(res => { console.log('response jjjjj', res); return res.json() })
            .then(response => {
                console.log("responseHome", response);
                if (response && response?.phone == "visitor with this phone already exists.") { showToastMessage("Mobile number already registred") }
                if (response && response?.visit_date == "Date has wrong format. Use one of these formats instead: YYYY-MM-DD.") { showToastMessage("Date formate should YYYY-MM-DD") }
                // if (response && response.data && response.data.id) {
                if (response && response?.status == "active") {
                    showToastMessage("Successfully registered")
                    setFirstName('');
                    setMobileNumber('');
                    setGender('');
                    setIdType('');
                    setIdNumber("");
                    setCover('');
                    setPurpose('');
                    setCheckInDate("");
                    setCheckInTime("");
                    navigation.navigate("RegisteredLottie")
                }

            })
            // .catch(e => showToastMessage('Something went wrong'))
            .finally(e => setLoading(false))
    }

    const picimage = (type, single = false) => {
        if (type == 'openCamera') {
            launchCamera(options, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                    let result = response.assets[0]
                    var d = { name: result.fileName, type: result.type, uri: result.uri, };
                    // console.log('d', d);
                    setCover({ value: d });
                    // else setSelectedImageArr([...selectedImageArr, d])
                }
            });
        }
        if (type == 'launchImageLibrary') {
            launchImageLibrary(options, async (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                    let result = response.assets[0]
                    var d = { name: result.fileName, type: result.type, uri: result.uri, };
                    setCover({ value: d });
                    // else setSelectedImageArr([...selectedImageArr, d])
                }
            });
        }
    }
    const handleImagePicker = (type) => {
        Alert.alert(
            'PLEASE CHOOSE IMAGE SOURCE !',
            '',
            [{ text: 'cancel', onPress: () => console.log('canceled'), style: 'cancel' },
            { text: "Open Camera", onPress: () => { picimage('openCamera', type == 'single' ? true : false) } },
            { text: "Launch Image Library", onPress: () => { picimage('launchImageLibrary', type == 'single' ? true : false) } }],
            { cancelable: false });
    }

    // const LottieFunction = () => {
    //     return (
    //         <Modal style={styles.containerMoadal}
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //         >
    //             <Lottie source={require('../assets/Registered.json')} autoPlay loop
    //                 style={styles.lottieImage} />
    //         </Modal>
    //     )
    // }

    return (
        <ScrollView style={styles.container}>
            {loading && <Loader size={'small'} color={'#000'} />}
            <View style={styles.IconTextView}>
                <View style={styles.radioButtonView}>
                    <Radio name="radio-btn-active" size={16} color='#010B6C' />
                    <Text style={styles.radioText}>Search by Name</Text>
                </View>
                <View style={[styles.radioButtonView, { marginLeft: 50 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ScannerScreen")}>
                        <Radio name="radio-btn-passive" size={16} color='#010B6C' />
                    </TouchableOpacity>
                    <Text style={styles.radioText}>Scan QR Code</Text>
                </View>
            </View>
            <View style={styles.TextInputViewSearchMobile}>
                <TextInput
                    style={styles.TextInputSearchMobile}
                    placeholder={'Enter Mobile number'}
                    maxLength={10}
                    keyboardType="numeric"
                    placeholderTextColor={"#a9a9a9"}
                    value={serachMobile}
                    onChangeText={value => handleSearchMobile(value)} />
                <Search name={'search'} style={{ marginRight: 15, }} size={18} color="#010B6C" />
            </View>
            <MaterialTextInput
                style={styles.inputBox}
                outlineColor='#DDDBDF'
                label='First name'
                keyboardType="default"
                mode='outlined'
                value={firstName}
                onChangeText={value => setFirstName(value)}
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#a9a9a9' } }}
            />
            <MaterialTextInput
                style={styles.inputBox}
                label='Mobile No.'
                mode='outlined'
                outlineColor='#DDDBDF'
                value={mobileNumber}
                maxLength={10}
                keyboardType="numeric"
                onChangeText={value => setMobileNumber(value)}
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#a9a9a9' } }}
            />
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Dropdown
                    style={
                        styles.dropdownRow}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataGender}
                    search={false}
                    // maxHeight={00}
                    labelField="label"
                    valueField="label"
                    placeholder={'Gender'}
                    iconColor='#010B6C'
                    value={gender?.label}
                    renderItem={(item) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <View style={{ height: 20, width: 20, padding: 10, margin: 15, backgroundColor: item.value, borderWidth: 0.5, borderColor: "green" }} /> */}
                            <Text style={{ fontFamily: "RobotoRegular", margin: 12 }}>{item?.label}</Text>
                        </View>
                    }
                    // onFocus={() => setIsColorFocus(true)}
                    // onBlur={() => setIsColorFocus(false)}
                    onChange={item => {
                        setGender(item.label);
                    }}
                />
                <Dropdown
                    style={
                        styles.dropdownRow}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataIdType}
                    search={false}
                    // maxHeight={00}
                    labelField="label"
                    valueField="label"
                    iconColor='#010B6C'
                    placeholder={'Id type'}
                    value={idType?.label}
                    renderItem={(item) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <View style={{ height: 20, width: 20, padding: 10, margin: 15, backgroundColor: item.value, borderWidth: 0.5, borderColor: "grey" }} /> */}
                            <Text style={{ fontFamily: "RobotoRegular", margin: 10 }}>{item?.label}</Text>
                        </View>
                    }
                    // onFocus={() => setIsColorFocus(true)}
                    // onBlur={() => setIsColorFocus(false)}
                    onChange={item => {
                        setIdType(item.label);
                    }}
                />
            </View>
            <MaterialTextInput
                style={styles.inputBox}
                outlineColor='#DDDBDF'
                label='ID number'
                keyboardType="default"
                mode='outlined'
                value={idNumber}
                onChangeText={setIdNumber}
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#a9a9a9' } }}
            />

            <Dropdown
                style={
                    styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={employee}
                search={false}
                // maxHeight={00}
                labelField="label"
                valueField="value"
                placeholder={'Whom to meet'}
                value={toMeet}
                iconColor='#010B6C'
                renderItem={(item) =>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <View style={{ height: 20, width: 20, padding: 10, margin: 15, backgroundColor: item.value, borderWidth: 0.5, borderColor: "grey" }} /> */}
                        <Text style={{ fontFamily: "RobotoRegular", margin: 10 }}>{item?.label}</Text>
                    </View>
                }
                onChange={item => {
                    setToMeet(item.value);
                }}
            />
            <Dropdown
                style={
                    styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataPurpose}
                search={false}
                // maxHeight={00}
                labelField="label"
                valueField="label"
                placeholder={'Purpose'}
                value={purpose}
                iconColor='#010B6C'
                renderItem={(item) =>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <View style={{ height: 20, width: 20, padding: 10, margin: 15, backgroundColor: item.value, borderWidth: 0.5, borderColor: "grey" }} /> */}
                        <Text style={{ fontFamily: "RobotoRegular", margin: 10 }}>{item?.label}</Text>
                    </View>
                }
                onChange={item => {
                    setPurpose(item.label);
                }}
            />
            <Pressable
                style={styles.uploadImgBtn}>
                <Text style={{ flex: 1, fontFamily: Fonts.RobotoRegular, padding: 10, color: "#a9a9a9" }}>Upload Image</Text>
                <TouchableOpacity style={{ marginRight: 8 }}
                    onPress={handleImagePicker}>
                    <Radio name={'camera'} color={"#010B6C"} />
                </TouchableOpacity>
            </Pressable>

            {(cover?.value == null) ?
                <></>
                :
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={{
                            uri: cover ? cover?.value?.uri : staticImage
                        }}
                        style={{ height: 35, width: 35, marginLeft: 20, marginTop: 10, borderRadius: 3 }}
                    />
                    <TouchableOpacity onPress={() => removeFromSelectedImage()} style={{ padding: 2, position: 'absolute', top: 2, left: 45, zIndex: 999, backgroundColor: "#000", borderRadius: 200 }}>
                        <Icon name={'closecircle'} color={"#fff"} size={12} />
                    </TouchableOpacity>
                </View>
            }
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <MaterialTextInput
                    style={styles.inputBoxTime}
                    label='Check-in date'
                    color={"red"}
                    keyboardType="numeric"
                    mode='outlined'
                    outlineColor='#DDDBDF'
                    value={CheckInDate}
                    onChangeText={setCheckInDate}
                    right={<MaterialTextInput.Icon name="calendar" color={"#010B6C"} size={17} style={{ marginTop: 10, marginLeft: 20 }} />}
                    theme={{ colors: { text: "#000", primary: '#010B6C', outlineColor: 'red', placeholder: '#a9a9a9' } }}
                />

                <MaterialTextInput
                    style={styles.inputBoxTime}
                    label='Check-in time'
                    color={"red"}
                    mode='outlined'
                    // keyboardType="numeric"
                    outlineColor='#DDDBDF'
                    value={CheckInTime}
                    onChangeText={setCheckInTime}
                    right={<MaterialTextInput.Icon name="calendar" color={"#010B6C"} size={17} style={{ marginTop: 10, marginLeft: 20 }} />}
                    theme={{ colors: { text: "#000", primary: '#010B6C', outlineColor: 'red', placeholder: '#a9a9a9' } }}
                />
            </View>

            <TouchableOpacity style={styles.SubmitButton}
                onPress={Submit}>
                {/* onPress={() => navigation.navigate("RegisteredLottie")}> */}
                <Text style={styles.SubmitText}>Update</Text>
            </TouchableOpacity>
        </ScrollView >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
        color: 'black',
        fontSize: 13,
        fontFamily: Fonts.RobotoMedium
    },
    TextInputViewSearchMobile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 30,
        borderColor: "#DDDBDF",
        borderWidth: 1,
        justifyContent: 'space-between',
        marginBottom: 7
    },
    TextInputSearchMobile: {
        fontSize: 12,
        paddingLeft: 12,
        paddingRight: 20,
        paddingVertical: 5,
        fontSize: 14,
        fontFamily: Fonts.RobotoRegular
    },
    inputBox: {
        fontSize: 14,
        backgroundColor: "#fff",
        fontFamily: Fonts.RobotoRegular,
        marginHorizontal: 10,
        height: 38,
        marginTop: 12,
    },
    inputBoxTime: {
        fontSize: 14,
        backgroundColor: "#fff",
        fontFamily: Fonts.RobotoRegular,
        marginHorizontal: 10,
        height: 38,
        marginTop: 12,
        width: width / 2.2
    },
    dropdown: {
        height: 40,
        borderColor: '#DDDBDF',
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 10,
        paddingLeft: 8,
        marginTop: 19
    },
    dropdownRow: {
        height: 40,
        width: width / 2.2,
        borderColor: '#DDDBDF',
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 8,
        paddingLeft: 8,
        marginTop: 20
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#a9a9a9",
        paddingHorizontal: 5,
        fontFamily: Fonts.RobotoRegular
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#000',
        fontFamily: Fonts.RobotoRegular
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    uploadImgBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 10,
        flexDirection: 'row',
        height: 45,
        borderColor: '#DDDBDF',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    SubmitButton: {
        backgroundColor: '#010B6C',
        alignSelf: 'center',
        marginVertical: 50,
        paddingVertical: 13,
        paddingHorizontal: width / 2.8,
        borderRadius: 15,
    },
    SubmitText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: Fonts.RobotoMedium
    },
    lottieImage: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        marginTop: height / 7
    },
    containerMoadal: {
        height: 500,
        width: 400
    }
})