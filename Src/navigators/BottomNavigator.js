import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color, Fonts, width } from '../Utils';
import HomeScreen from '../screens/HomeScreen';
import VisitorHistory from "../screens/VisitorHistory"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditHomeScreen from '../screens/EditHomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import RegisteredUserScreen from '../screens/RegisteredUserScreen';
import LogoutScreen from '../screens/LogoutScreen';
import AnimationSuccess from '../screens/AnimationSuccess';
import RegisteredLottie from '../screens/RegisteredLottie';

const BottomTabStack = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AddVisitorStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const LogoutStack = createStackNavigator();

function MyTabBar({ state, descriptors, navigation, index }) {
    // const isDrawerStatus = useDrawerStatus();
    return (
        <View style={{ ...style.footer, ...style.shodow, ...style.imageback }} key={index}
            source={require('../assets/ducis-logo2.png')}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };
                const onLongPress = () => {
                    navigation.emit({ type: 'tabLongPress', target: route.key });
                };
                const getIcon = labelname => {
                    let iconName = ''
                    if (labelname == 'HomeScreens') {
                        iconName = 'home';
                    }
                    if (labelname == 'AddVisitor') {
                        iconName = 'plus-box';
                    }
                    if (labelname == 'History') {
                        iconName = 'calendar-search';
                    }
                    if (labelname == 'Logout') {
                        iconName = 'account';
                    }
                    return (
                        <View style={[{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }]}>
                            <Icon name={iconName} size={20} color={isFocused ? "#010B6C" : "#777777"} />
                            <Text style={{ textAlign: 'center', fontSize: 12, color: isFocused ? "#010B6C" : "#777777", fontFamily: Fonts.RobotoMedium, }}>{label}</Text>
                        </View>
                    );
                };
                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[
                            { flex: 1, alignItems: 'center', padding: 6 },
                            // label == 'Add' && { ...style.createEvent, ...style.shodow, },
                            // label == 'Add' && { ...style.createEvent, ...style.shodow, },
                            // (label == 'Add' && isFocused) && { ...style.createEvent, ...style.shodow, backgroundColor: Color.primaryColor },
                        ]}>
                        {getIcon(label)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const withHeaderOptions = (navigation, title = '') => {
    return {
        title: title,
        headerStyle: {
            backgroundColor: Color.white,
            borderBottomColor: '#eee',
            borderBottomWidth: 1.2,
        },
        headerTitleStyle: {
            textAlign: 'left',
            // fontFamily: Fonts.Medium,
            fontSize: 19,
        },
        //   headerRight: React.useCallback(() => {
        //     return (
        //       <View style={{ right: 20, flexDirection: 'row', alignItems: 'center' }}>
        //         {title == 'abc' && <Text style={{ paddingHorizontal: 10, fontSize: 18 }}>{'Save draft'}</Text>}
        //         {title == 'xyz' && <Icon name='shopping-bag' type='font-awesome' size={17} style={{ paddingHorizontal: 13 }} />}
        //         <FeatherIcon name="align-left" size={30} color={Color.black} onPress={() => navigation.openDrawer()} style={{}} />
        //         {title !== 'sdf' && <FontAwesome name="user-circle" size={22} color={Color.black} onPress={() => navigation.navigate('aaa')} style={{ marginLeft: 12 }} />}

        //       </View>
        //     );
        //   }),
    };
};
const withoutHeaderOption = (navigation, isHeader = true, title = '') => {
    return {
        title: title,
        gestureEnabled: false,
        swipeEnabled: false,
        headerTintColor: '#000',
        headerStyle: {
            backgroundColor: Color.white,
            borderBottomColor: '#eee',
            borderBottomWidth: 1.2,
        },
        headerShown: isHeader,
    };
};

const HomeStackNavigator = ({ navigation }) => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={withHeaderOptions(navigation, 'Add Visitor')} />
            <HomeStack.Screen name="VisitorHistory" component={VisitorHistory} options={withHeaderOptions(navigation, 'Visitor History')} />
            <HomeStack.Screen name="EditHomeScreen" component={EditHomeScreen} options={withHeaderOptions(navigation, 'Edit Visitor Details')} />
            <HomeStack.Screen name="RegisteredUserScreen" component={RegisteredUserScreen} options={withHeaderOptions(navigation, 'Visitor Details')} />
            <HomeStack.Screen name="CheckOutScreen" component={CheckOutScreen} options={withHeaderOptions(navigation, 'Visitor')} />
            <HomeStack.Screen name="ScannerScreen" component={ScannerScreen} options={withHeaderOptions(navigation, 'Add Visitor')} />
            <HomeStack.Screen name="RegisteredLottie" component={RegisteredLottie} options={withHeaderOptions(navigation, 'Add Visitor')} />
            <HomeStack.Screen name="AnimationSuccess" component={AnimationSuccess} options={withHeaderOptions(navigation, 'Visitor Details')} />
        </HomeStack.Navigator>
    );
};
const AddVisitorStackNavigator = ({ navigation }) => {
    return (
        <AddVisitorStack.Navigator>
            <HomeStack.Screen name="ScannerScreen" component={ScannerScreen} options={withHeaderOptions(navigation, 'Add Visitor')} />
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={withHeaderOptions(navigation, 'Add Visitor')} />
            <HomeStack.Screen name="VisitorHistory" component={VisitorHistory} options={withHeaderOptions(navigation, 'Visitor History')} />
            <HomeStack.Screen name="EditHomeScreen" component={EditHomeScreen} options={withHeaderOptions(navigation, 'Edit Visitor Details')} />
            <HomeStack.Screen name="RegisteredUserScreen" component={RegisteredUserScreen} options={withHeaderOptions(navigation, 'Visitor Details')} />
            <HomeStack.Screen name="CheckOutScreen" component={CheckOutScreen} options={withHeaderOptions(navigation, 'Visitor')} />
            <HomeStack.Screen name="RegisteredLottie" component={RegisteredLottie} options={withHeaderOptions(navigation, 'Visitor')} />
            <HomeStack.Screen name="AnimationSuccess" component={AnimationSuccess} options={withHeaderOptions(navigation, 'Visitor Details')} />
        </AddVisitorStack.Navigator>
    );
};
const HistoryStackNavigator = ({ navigation }) => {
    return (
        <HistoryStack.Navigator>
            <HomeStack.Screen name="VisitorHistory" component={VisitorHistory} options={withHeaderOptions(navigation, 'Visitor History')} />
            <HomeStack.Screen name="EditHomeScreen" component={EditHomeScreen} options={withHeaderOptions(navigation, 'Edit Visitor Details')} />
            <HomeStack.Screen name="CheckOutScreen" component={CheckOutScreen} options={withHeaderOptions(navigation, 'Visitor')} />
            <HomeStack.Screen name="RegisteredUserScreen" component={RegisteredUserScreen} options={withHeaderOptions(navigation, 'Visitor Details')} />
            <HomeStack.Screen name="AnimationSuccess" component={AnimationSuccess} options={withHeaderOptions(navigation, 'Visitor Details')} />
            <HomeStack.Screen name="RegisteredLottie" component={RegisteredLottie} options={withHeaderOptions(navigation, 'Visitor Details')} />
        </HistoryStack.Navigator>
    );
};
const LogoutStackNavigator = ({ navigation }) => {
    return (
        <LogoutStack.Navigator>
            <HomeStack.Screen name="LogoutScreen" component={LogoutScreen} options={withHeaderOptions(navigation, 'Logout')} />
        </LogoutStack.Navigator>
    );
};

export default function BottomNavigator({ }) {
    const generateRandomNumber = () => Math.floor(Math.random() * 10 + 1);
    return (
        <BottomTabStack.Navigator
            tabBar={props => <MyTabBar {...props} index={props.state.index} />}
            sceneContainerStyle={{ flex: 1 }}>
            <BottomTabStack.Screen options={{ headerShown: false }} name="HomeScreens" component={HomeStackNavigator} />
            <BottomTabStack.Screen options={{ headerShown: false }} name="AddVisitor" component={AddVisitorStackNavigator} />
            <BottomTabStack.Screen options={{ headerShown: false }} name="History" component={HistoryStackNavigator} />
            <BottomTabStack.Screen options={{ headerShown: false }} name="Logout" component={LogoutStackNavigator} />
        </BottomTabStack.Navigator>
    );
}


const style = StyleSheet.create({
    footer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        position: 'relative',
        borderWidth: 1,
        borderColor: "#a9a9a9"
    },
    imageback: {
        height: 60,
        width: width,
    },
    rightImg: {
        height: 35,
        width: 35,
        borderRadius: 40,
    },
    shodow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 2,
    },
    createEvent: {
        // width:30,
        // height:30,
        top: -12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 50,
        elevation: 10,
    },
    focusedStyle: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginBottom: 5,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
})

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const BottomNavigator = () => {
//     return (
//         <View>
//             <Text>BottomNavigator</Text>
//         </View>
//     )
// }

// export default BottomNavigator

// const styles = StyleSheet.create({})