import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Color from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';


const customHeaderButton = (props:any)=>{
    return <HeaderButton {...props} IconComponent={Icon} color='white' iconSize={23}></HeaderButton>
};

export default customHeaderButton;