import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import VisitorHistoryCard from './VisitorHistoryCard'
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts, height, Loader } from '../../Utils';
import sad_robot from '../../assets/sad_robot.jpeg';
import Lottie from 'lottie-react-native';
import Toptab from "../../screens/Toptab"
import VisitorCheckOut from './VisitorCheckOut';
import Appurl from "../../API/Constant"
import { useSelector } from 'react-redux';
import moment from 'moment';

const tabData = ['CheckOut', ' Visitor History']
const DATA = [1, 2, 3, 4]

export default function index({ navigation }) {

    const token = useSelector(state => state?.user?.token ? state.user.token : '')
    const [activeTab, setActiveTab] = useState('1')
    const [visitorData, setVisitorData] = useState([])
    const [loading, setLoading] = useState(false)
    const [clicked, setClicked] = useState('0')
    const [serachMobile, setSearchMobile] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const [dummyItemList, setDummyItemList] = useState([])


    useEffect(() => {
        const unsubscribesELLER = navigation.addListener('focus', () => {
            getVisitorData()
            setSearchMobile("")
            setSearchDate("")
            return unsubscribesELLER;
        })
    }, [])

    const getVisitorData = async () => {
        setLoading(true)
        fetch(Appurl.VISITORDATA, {
            method: 'GET',
            headers: { Authorization: `Token ${token}` },
        }).then(res => res.json())
            .then(response => {
                if (response && response?.length !== 0) {
                    setVisitorData(response)
                    setClicked("0")
                }
                console.log("response--------", response);
            }).finally(e => {
                setLoading(false)
            })
    }

    const handleSearchMobile = async (text) => {
        setSearchMobile(text);
        if (text && text.length == 10) {
            console.log(`${Appurl.VISITORSEARCH}?phone=${text}`);
            fetch(`${Appurl.VISITORSEARCH}?phone=${serachMobile}`, {
                method: 'GET',
                headers: { Authorization: `Token ${token}` },
            }).then(res => res.json())
                .then(response => {
                    console.log("response", response);
                    if (response) {
                        if (response && response.length !== 0) {
                            setVisitorData(response)
                        }
                    }
                })
        }
    }
    const handleSearchDate = async (text) => {
        setSearchDate(text);
        fetch(`${Appurl.VISITORSEARCH}?visit_date=${text}`, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                Authorization: `Token ${token}`,
                "Cookie": "csrftoken=qKHxTMxrcC7GorETwnnUhYxntfPlyyAcjTveTEsPJ1AAgGKEatqYaQDmxWZCpBku; sessionid=o8rixih13rhssrnxmpn03hw849dzpxl4"
            },
        }).then(res => res.json())
            .then(response => {
                console.log("responsewSearch", response);
                if (response) {
                    if (response && response.length !== 0) {
                        setVisitorData(response)
                    } else setVisitorData(dummyItemList)
                }
            })
    }

    const handleToggle = index => {
        // console.log("index", index);
        if (clicked === index) {
            return setClicked('0');
        }
        setClicked(index);
    };
    return (
        <View style={styles.container}>
            {loading && <Loader size={'small'} color={'#000'} />}

            <Toptab
                data={tabData}
                activeTab={activeTab}
                setActiveTab={val => setActiveTab(val)} />

            {(DATA.length !== 0) ?
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                    <View style={styles.TextInputView1}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={'Enter Mobile number'}
                            placeholderTextColor={"grey"}
                            value={serachMobile}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={value => handleSearchMobile(value)} />

                        <Icon name={'search'} style={{ marginRight: 15, }} size={16} color="#010B6C" />
                    </View>
                    <View style={styles.TextInputView2}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={'Search by date'}
                            placeholderTextColor={"grey"}
                            value={searchDate}
                            onChangeText={value => handleSearchDate(value)} />
                        <Icon name={'search'} style={{ marginRight: 15, }} size={16} color="#010B6C" />
                    </View>
                </View>
                :
                <></>
            }
            {(DATA && DATA.length !== 0) ?
                <Text style={styles.Text}>All Visitor Records</Text>
                :
                <></>
            }

            {DATA && DATA.length !== 0 && activeTab == "1" &&
                <FlatList
                    data={visitorData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <VisitorCheckOut data={item} navigation={navigation}
                        refreshPage={() => getVisitorData()}
                        closeMenuOption={() => setClicked('0')}
                        onToggle={() => handleToggle(index)}
                        active={clicked === index} />}
                />
            }

            {DATA.length == 0 && activeTab == "1" &&
                <View style={styles.NoDataView}>
                    <Lottie source={require('../../assets/NoData.json')} autoPlay loop
                        style={styles.lottieImage} />
                    <Text style={styles.Text1UnderNoData}>No Visitor Data Available</Text>
                    <Text style={styles.Text2UnderNoData}>Start Register New Visitor</Text>
                    <TouchableOpacity style={styles.NoDataButton}
                        onPress={() => navigation.navigate("HomeScreen")}>
                        <Text style={styles.NoDataButtonText}>Add New Visitor</Text>
                    </TouchableOpacity>
                </View>
            }

            {DATA && DATA.length !== 0 && activeTab == "2" &&
                <FlatList
                    data={visitorData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => <VisitorHistoryCard data={item} navigation={navigation}
                        closeMenuOption={() => setClicked('0')}
                        onToggle={() => handleToggle(index)}
                        active={clicked === index} />}
                />
            }
            {DATA.length == 0 && activeTab == "2" &&
                <View style={styles.NoDataView}>
                    <Lottie source={require('../../assets/NoData.json')} autoPlay loop
                        style={styles.lottieImage} />
                    <Text style={styles.Text1UnderNoData}>No Visitor Data Available</Text>
                    <Text style={styles.Text2UnderNoData}>Start Register New Visitor</Text>
                    <TouchableOpacity style={styles.NoDataButton}
                        onPress={() => navigation.navigate("HomeScreen")}>
                        <Text style={styles.NoDataButtonText}>Add New Visitor</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>)
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1
    },
    TextInputView1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 2,
        borderColor: "lightgrey",
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    TextInputView2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 2,
        borderColor: "lightgrey",
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    Text: {
        marginVertical: 15,
        marginLeft: 20,
        color: '#010B6C',
        fontFamily: Fonts.RobotoBold,
    },
    TextInput: {
        fontSize: 12,
        paddingLeft: 12,
        color: "grey",
        paddingRight: 20,
        paddingVertical: -10,
        fontFamily: Fonts.RobotoRegular,
    },
    NoDataView: {
        flex: 1,
        backgroundColor: "#fff"
    },
    Text1UnderNoData: {
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: Fonts.RobotoMedium,
        marginTop: 60,
        color: "#000"
    },
    Text2UnderNoData: {
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: Fonts.RobotoRegular,
        marginTop: 30
    },
    lottieImage: {
        height: 250,
        width: 250,
        alignSelf: 'center',
    },
    NoDataButton: {
        alignSelf: 'center',
        paddingHorizontal: 70,
        paddingVertical: 12,
        backgroundColor: '#010B6C',
        marginTop: 60,
        borderRadius: 10
    },
    NoDataButtonText: {
        color: '#fff',
        fontFamily: Fonts.RobotoRegular,
        fontSize: 15
    }
})