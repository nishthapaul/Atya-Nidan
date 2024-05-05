import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function StatsScreen({ navigation, user }) {
    const [counts, setCounts] = useState([]);
    const [dates, setDates] = useState([]);
    const { authToken } = useAuth();

    useEffect(() => {
        const statsUrl = API_PATHS.GET_STATS_FOR_ADMIN;
        axios.get(statsUrl, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            const data = response.data;
            const counts = data.map(item => item.count);
            const dates = data.map(item => item.date);
            setCounts(counts);
            setDates(dates);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            if (error.response) {
                console.error('Backend error message:', error.response.data.message);
            }
        });
    }, [authToken, user.empId]);

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(123, 179, 255, ${opacity})`, // Example: Blue color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForLabels: {
            fontSize: '16', // Increase label font size
        }
    };

    return (
        <View style={styles.container}>
            <Text
                // onPress={() => navigation.navigate('Home')}
                style={styles.title}>Forms filled in last 7 days</Text>
            {counts.length > 0 ? (
                <BarChart
                    data={{
                        labels: dates,
                        datasets: [{ data: counts }]
                    }}
                    width={windowWidth - 30}
                    height={300} // Increased height
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    style={styles.chart}
                    bezier
                />
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
    },
});
