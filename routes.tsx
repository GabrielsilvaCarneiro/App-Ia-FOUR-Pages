import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons/'
import { Home } from './pages/index'
import { Treino } from './pages/paginaTreino'
import { Car } from './pages/paginaDiagnostCar'
import { Recomendacao } from './pages/paginaRecomendacao'
import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="egg" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="egg-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="treino"
                component={Treino}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="barbell" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="barbell-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="DiagnostCar"
                component={Car}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<FontAwesome5 name="car-crash" size={24} color="black" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="football-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="recomendacao"
                component={Recomendacao}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="videocam" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="videocam-outline" />)
                    }
                }}
            />
        </Tab.Navigator>
    )
}