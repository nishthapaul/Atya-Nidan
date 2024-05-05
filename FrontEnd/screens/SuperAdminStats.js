import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext';

const windowWidth = Dimensions.get('window').width;

export default function SuperAdminStats({ navigation, user }) {
    const [counts, setCounts] = useState([]);
    const [dates, setDates] = useState([]);
    const [totalCount, setTotalCount] = useState(0); // State to store the total count
    const { authToken } = useAuth();
    console.log(user)
    useEffect(() => {
        const statsUrl = API_PATHS.GET_STATS_FOR_SUPERADMIN.replace(":stateId", user);
        axios.get(statsUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            const data = response.data;
            const newCounts = data.map(item => item.count);
            const newDates = data.map(item => item.date);
            setCounts(newCounts);
            setDates(newDates);
            setTotalCount(newCounts.reduce((sum, current) => sum + current, 0)); // Calculate total count
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            if (error.response) {
                console.error('Backend error message:', error.response.data.message);
            }
        });
    }, [authToken, user]);

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#fffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(13, 53, 79, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForLabels: {
            fontSize: '16',
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.totalTitle}>Forms filled in last 7 days</Text>
            {counts.length > 0 ? (
                <>
                    <BarChart
                        data={{
                            labels: dates,
                            datasets: [{ data: counts }]
                        }}
                        width={windowWidth - 30}
                        height={300}
                        yAxisLabel=""
                        chartConfig={chartConfig}
                        style={styles.chart}
                        bezier
                    />
                    <View style={styles.totalBox}>
                        <Text style={styles.totalNumber}>{totalCount}</Text>
                        <Text style={styles.totalTitle}>Total forms filled in last 7 days</Text>
                    </View>
                </>
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chart: {
        marginVertical: 18,
        borderRadius: 16,
        // fillShadowGradient: '#fff', // Set darker color for shadow gradient
        // fillShadowGradientOpacity: 0, 
        borderWidth: 1,
        borderColor: '#000'
    },
    // totalBox: {
    //     marginTop: 20,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // totalNumber: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: '#000',
    // },
    // totalTitle: {
    //     fontSize: 18,
    //     color: '#666',
    // },
    totalBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 15,
        margin: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginRight: 20,
        marginLeft: -10,
      },
      totalNumber: {
        fontSize: 51,
        fontWeight: 'bold',
        color: '#000',
      },
      totalTitle: {
        fontSize: 20,
        color: '#808080',
        fontWeight: 'bold',
      },
});
