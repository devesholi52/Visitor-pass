import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, FlatList, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput as MaterialTextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import Icon from 'react-native-vector-icons/AntDesign';
import Radio from 'react-native-vector-icons/Fontisto';
import Search from 'react-native-vector-icons/Ionicons';
import { Fonts, Loader, width } from '../Utils';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const CheckOutScreen = ({ navigation }) => {
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
    data = [
        { key: "1", label: "male" },
        { key: "2", label: "Female" },
    ],
        dataIdType = [
            { key: "1", label: "PAN Card" },
            { key: "2", label: "Voter ID Card" },
            { key: "3", label: "Adhar Card" },
            { key: "4", label: "Driving License" },
        ],
        dataWhomToMeet = [
            { key: "1", label: "Neha singh(EMPL 2323)" },
            { key: "2", label: "rakesh singh(EMPL 2323)" },
            { key: "3", label: "vinay pathak(EMPL 2323)" },
            { key: "4", label: "ranjan kumar(EMPL 2323)" },
        ]

    const [value, setValue] = useState(null)
    const [cover, setCover] = useState({
        value: null,
        error: ''
    })
    const [selectedImageArr, setSelectedImageArr] = useState([])
    const [isChanged, setIsChanged] = useState(false)


    const removeFromSelectedImage = (item, index) => {
        selectedImageArr.splice(index, 1)
        setIsChanged(!isChanged)
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
                    if (single) setCover({ value: d });
                    else setSelectedImageArr([...selectedImageArr, d])
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
                    if (single) setCover({ value: d });
                    else setSelectedImageArr([...selectedImageArr, d])
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
    const renderSelectedImage = ({ item, index }) => {
        return (
            <>
                <View style={{ marginHorizontal: index > 0 ? 2 : 0, padding: 5 }}>
                    <Image source={item} style={{ width: 50, height: 50, borderRadius: 10 }} />
                    <TouchableOpacity onPress={() => removeFromSelectedImage(item, index)} style={{ padding: 2, position: 'absolute', bottom: 2, right: 2, zIndex: 999, backgroundColor: "#000", borderRadius: 200 }}>
                        <Icon name={'closecircle'} color={"#fff"} size={10} />
                    </TouchableOpacity>
                </View>
            </>
        )
    }

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
                    placeholderTextColor={"#a9a9a9"} />
                <Search name={'search'} style={{ marginRight: 15, }} size={18} color="#010B6C" />
            </View>
            <MaterialTextInput
                style={styles.inputBox}
                label='First name'
                keyboardType="default"
                mode='outlined'
                outlineColor='#DDDBDF'
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#a9a9a9' } }}
            />
            <MaterialTextInput
                style={styles.inputBox}
                label='Last name'
                keyboardType="default"
                mode='outlined'
                outlineColor='#DDDBDF'
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
                    data={data}
                    search={false}
                    // maxHeight={00}
                    labelField="label"
                    valueField="key"
                    placeholder={'Gender'}
                    iconColor='#010B6C'
                    value={value}
                    renderItem={(item) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: 20, width: 20, padding: 10, margin: 15, backgroundColor: item.value, borderWidth: 0.5, borderColor: "grey" }} />
                            <Text style={{ fontFamily: "RobotoRegular" }}>{item?.label}</Text>
                        </View>
                    }
                    // onFocus={() => setIsColorFocus(true)}
                    // onBlur={() => setIsColorFocus(false)}
                    onChange={item => {
                        setValue(item.value);
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
                    valueField="key"
                    iconColor='#010B6C'
                    placeholder={'Id type'}
                    value={value}
                    renderItem={(item) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: 20, width: 20, padding: 10, margin: 15, backgroundColor: item.value, borderWidth: 0.5, borderColor: "grey" }} />
                            <Text style={{ fontFamily: "RobotoRegular" }}>{item?.label}</Text>
                        </View>
                    }
                    // onFocus={() => setIsColorFocus(true)}
                    // onBlur={() => setIsColorFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                    }}
                />
            </View>
            <MaterialTextInput
                style={styles.inputBox}
                label='ID number'
                keyboardType="default"
                mode='outlined'
                outlineColor='#DDDBDF'
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#a9a9a9' } }}
            />

            <Pressable
                style={styles.uploadImgBtn}>
                <Text style={{ flex: 1, fontFamily: Fonts.RobotoRegular, padding: 10, color: "#a9a9a9" }}>Upload Images</Text>
                <TouchableOpacity style={{ marginRight: 10 }}
                    onPress={handleImagePicker}>
                    <Radio name={'camera'} color={"#010B6C"} />
                </TouchableOpacity>
            </Pressable>

            <FlatList
                data={selectedImageArr}
                renderItem={renderSelectedImage}
                horizontal={true} />

            <Dropdown
                style={
                    styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataWhomToMeet}
                search={false}
                // maxHeight={00}
                labelField="label"
                valueField="key"
                placeholder={'Whom to meet'}
                value={value}
                iconColor='#010B6C'
                renderItem={(item) =>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ height: 20, width: 20, padding: 10, margin: 15, backgroundColor: item.value, borderWidth: 0.5, borderColor: "grey" }} />
                        <Text style={{ fontFamily: "RobotoRegular" }}>{item?.label}</Text>
                    </View>
                }
                onChange={item => {
                    setValue(item.value);
                }}
            />
            <MaterialTextInput
                style={[styles.inputBox, { paddingBottom: 15 }]}
                label='Purpose'
                keyboardType="default"
                mode='outlined'
                outlineColor='#DDDBDF'
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#a9a9a9' } }}
            />

            <MaterialTextInput
                style={styles.inputBox}
                label='Check-in time(bydefault take current time)'
                mode='outlined'
                outlineColor='#DDDBDF'
                right={<MaterialTextInput.Icon name="calendar" color={"#010B6C"} size={20} style={{ marginTop: 10 }} />}
                theme={{ colors: { text: "#000", primary: '#010B6C', placeholder: '#a9a9a9' } }}
            />

            <TouchableOpacity style={styles.SubmitButton}
                onPress={() => navigation.navigate('AnimationSuccess')}>
                <Text style={styles.SubmitText}>Check out</Text>
            </TouchableOpacity>
        </ScrollView >
    )
}

export default CheckOutScreen

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
        height: 40,
        marginTop: 13,
    },
    dropdown: {
        height: 43,
        borderColor: '#DDDBDF',
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 10,
        paddingLeft: 8,
        marginTop: 20
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
    }
})