import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './navigators/AuthNavigator';
import BottomNavigator from './navigators/BottomNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    setToken,
    setUserDetails,
} from './redux/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createStackNavigator();
const RootNavigator = props => {
    // const [token, setToken] = useState(false)
    const dispatch = useDispatch()
    const { token = '' } = useSelector(state => state?.user);
    const [processing, setProcessing] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // AsyncStorage.clear()
        const checkLogin = async () => {
            await AsyncStorage.getItem('token').then(async res => {
                console.log("res++++++++++++", res);
                if (res) setIsAuthenticated(true);
                else setIsAuthenticated(false);
                dispatch(setToken(res));
                // dispatch(setUserDetails(res));
            });
        };
        setProcessing(false);
        checkLogin();
    }, [token]);

    if (processing) return <ActivityIndicator size={'small'} />

    return (<>
        {isAuthenticated ? (
            <BottomNavigator {...props} />
        ) : (
            <AuthNavigator {...props} />
        )}
    </>)
};

export default RootNavigator;