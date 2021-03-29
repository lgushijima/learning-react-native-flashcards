import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {colors} from '../utils/settings'

export default class Test extends Component {
    render() {
        return (
            <View>
                <Text>Test</Text>
            </View>
        )
    }
}

// <Stack.Navigator>
//     <Stack.Screen
//         name={options.menuName}
//         component={Test}
//         options={{
//             title: options.title,
//             headerLeft: () => (
//                 <View
//                     style={{
//                         marginLeft: 10,
//                         padding: 10,
//                         width: 48,
//                         alignItems: 'center',
//                     }}>
//                     <Icons
//                         name="arrow-left"
//                         size={20}
//                         color={colors.white}
//                         onPress={() => {
//                             alert(1)
//                         }}
//                     />
//                 </View>
//             ),
//             headerStyle: {
//                 backgroundColor: colors.primary,
//             },
//             headerTintColor: colors.white,
//             headerTitleStyle: {
//                 fontWeight: 'normal',
//             },
//             tabBarIcon: () => {
//                 return (
//                     <Icons
//                         name="home"
//                         size={20}
//                         color={colors.white}
//                     />
//                 )
//             },
//             tabBarOptions: {
//                 padding: 10,
//             },
//         }}
//     />
// </Stack.Navigator>
