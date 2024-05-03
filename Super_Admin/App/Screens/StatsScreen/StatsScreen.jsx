import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Header from '../../Components/Header/header';
import PieChart from 'react-native-pie-chart';
import { BarChart } from 'react-native-chart-kit';
import { Circle, G, Svg, Text as SvgText } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class TestChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPatients: 0,
      healthyPatients: 0,
      unhealthyPatients: 0,
    };
  }

  componentDidMount() {
    this.fetchPatientData();
  }

  // fetchPatientData = () => {
  //   fetch('https://my-json-server.typicode.com/ume950/api/stats')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (Array.isArray(data) && data.length > 0) {
  //         const firstItem = data[0];
  //         const { total, healthy, unhealthy } = firstItem;
  //         this.setState({
  //           totalPatients: total || 0,
  //           healthyPatients: healthy || 0,
  //           unhealthyPatients: unhealthy || 0,
  //         });
  //       } else {
  //         console.error('Invalid data format:', data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  render() {
    const { totalPatients, healthyPatients, unhealthyPatients } = this.state;

    if (totalPatients === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.noDataText}>No patient data available.</Text>
        </View>
      );
    }

    const healthyPercentage = (healthyPatients / totalPatients) * 100;
    const unhealthyPercentage = (unhealthyPatients / totalPatients) * 100;

    const circleRadius = 100;
    const circleWidth = 40;
    const circleCircumference = 2 * Math.PI * circleRadius;

    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.topContainer}>
          <View style={styles.chartContainer}>
            <PieChart
              widthAndHeight={windowWidth / 6}
              series={[90, 10]}
              sliceColor={['#303F9F', '#B71C1C']}
              doughnut={false}
              style={styles.pieChart}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForLabels: {
                  fontSize: 18,
                },
              }}
              accessor=""
            />
            <View style={styles.labelContainer}>
              <View style={styles.indicatorRow}>
                <View style={[styles.colorIndicator, { backgroundColor: '#303F9F' }]} />
                <Text style={styles.labelText}>{`Healthy: ${healthyPatients} (${healthyPercentage.toFixed(2)}%)`}</Text>
              </View>
              <View style={styles.indicatorRow}>
                <View style={[styles.colorIndicator, { backgroundColor: '#B71C1C' }]} />
                <Text style={styles.labelText}>{`Unhealthy: ${unhealthyPatients} (${unhealthyPercentage.toFixed(2)}%)`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <Svg width={windowWidth / 2} height={windowHeight / 2}>
              <G>
                <Circle
                  cx={windowWidth / 4}
                  cy={windowHeight / 4}
                  r={circleRadius}
                  fill="#000066"
                  stroke="#B6D0E2"
                  strokeWidth={circleWidth}
                />
                <Circle
                  cx={windowWidth / 4}
                  cy={windowHeight / 4}
                  r={circleRadius}
                  fill="transparent"
                  stroke="#00FFFF"
                  strokeWidth={circleWidth}
                  strokeDasharray={`${circleCircumference * ((100 - (healthyPatients / totalPatients) * 100) / 100)}, ${circleCircumference}`}
                  strokeDashoffset={circleCircumference / 4}
                />
                <SvgText
                  x={windowWidth / 4}
                  y={windowHeight / 4}
                  fill="#00FFFF"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize={24}
                  fontWeight="bold"
                >
                  {`${((healthyPatients / totalPatients) * 100).toFixed(2)}%`}
                </SvgText>
                <SvgText
                  x={windowWidth / 4}
                  y={windowHeight / 4 + 30}
                  fill="#00FFFF"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize={24}
                >
                  Healthy
                </SvgText>
              </G>
            </Svg>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.chartBox}>
            <BarChart
              data={{
                labels: ["Healthy", "Unhealthy"],
                datasets: [
                  {
                    data: [healthyPatients, unhealthyPatients]
                  }
                ]
              }}
              width={windowWidth / 1.5}
              height={windowHeight / 2.4}
              yAxisLabel=""
              yAxisInterval={10} // ensures that there is an interval of 1 between each y-axis label
              yAxisSuffix=""
              fromZero={true}
              segments={5} // sets the number of segments on the y-axis
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 2,
                color: (opacity = 10) => `rgba(300, 0, 0, ${opacity})`,
                barPercentage: 1.5, // Adjust bar width
                style: {
                  borderRadius: 16,
                  fillShadowGradient: '#000', // Set darker color for shadow gradient
                  fillShadowGradientOpacity: 3, // Adjust opacity of shadow gradient
                }
              }}
              
              style={{
                marginVertical: 8,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#000'
              }}
            />
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalNumber}>{totalPatients}</Text>
            <Text style={styles.totalTitle}>Total No Of Patient</Text>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  noDataText: {
    fontSize: 18,
    color: '#808080',
  },
  topContainer: {
    flexDirection: 'row',
    flex: 1,
    margin: 5,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  pieChart: {
    marginTop: 10,
  },
  labelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  labelText: {
    fontSize: 18,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
  },
  chartBox: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -6,
  },
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
    fontSize: 71,
    fontWeight: 'bold',
    color: '#000',
  },
  totalTitle: {
    fontSize: 25,
    color: '#808080',
    fontWeight: 'bold',
  },
});
