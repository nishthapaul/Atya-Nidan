import React, { useState, useEffect } from "react";
import Card from "../Card";
import {
    View,
    Switch,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Button,
    TextInput,
    ScrollView
} from "react-native";
import { Table, Row, TableWrapper } from "react-native-table-component";
import { SearchBar, Icon } from "react-native-elements";

export default function FieldWorker({ navigation }) {
    const [tableData, setTableData] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [newTaluka, setTaluka] = useState("");

    const toggleSwitch = (index) => {
        const newData = [...tableData];
        newData[index].available = !newData[index].available;
        setTableData(newData);
    };

    const filteredData = tableData && tableData.filter((item) => {
        const name = item.firstName + item.lastName;
        return(name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    );
    const onSelectUser = (user) => {
        console.log("selecteduser", user);
        setSelectedUser(user);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setNewName("");
        setTaluka("");
    };

    const handleAdd = () => {
        // const newId = tableData.length + 1;
        // setTableData([
        //     ...tableData,
        //     { id: newId, name: newName, taluka: newTaluka, available: false },
        // ]);
        // hideModal();
    };
    useEffect(() => {
        // Make API call to fetch data
        fetch("https://c7bf-103-156-19-229.ngrok-free.app/api/districts/2/fieldworkers")
            .then((response) => {
                console.log("response", response);
                return response.json()
            })
            .then((data) => {
                console.log("fetch_data", data);
                setTableData(data);
                setSelectedUser(data[0]);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    //console.log(selectedUser);
    return (
        <View
            style={{
                height: 620,
                //marginTop: 10,
                display: "flex",
                backgroundColor: "white",
                flex: 1,
                flexDirection: 'row',
            }}
        >
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: 45,
                        backgroundColor: "white",
                    }}
                >
                    <SearchBar
                        placeholder="Search..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        containerStyle={{
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderRadius: 25,
                            width: "80%",
                            height: 45
                        }}
                        inputContainerStyle={{ backgroundColor: "white", height: 30 }}
                        inputStyle={{ color: "black" }}
                    />
                    <TouchableOpacity onPress={showModal}>
                        <View style={styles.circle}>
                            <Icon name="plus" type="font-awesome" color="black" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Modal */}
                <Modal visible={isModalVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text>Name:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setNewName}
                                value={newName}
                            />
                            <Text>Taluka:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setTaluka}
                                value={newTaluka}
                            />
                            <View style={styles.buttonContainer}>
                                <Button title="Add" onPress={handleAdd} />
                                <Button title="Cancel" onPress={hideModal} />
                            </View>
                        </View>
                    </View>
                </Modal>

                <View
                    style={{
                        height: 400,
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: "white",
                    }}
                >
                    <Table>
                        <Row
                            data={["ID", "Name", "Taluka", "Assigned"]}
                            style={{ height: 40 }}
                            flexArr={[1, 3.5, 3.5, 2]}
                        />
                        <ScrollView style={{ maxHeight: 420 }}>
                            <TableWrapper>
                                {filteredData.map((user, index) => (
                                    <TouchableOpacity
                                        key={user.id}
                                        onPress={() => onSelectUser(user)}>
                                        <Row
                                            key={index}
                                            data={[
                                                index + 1,
                                                `${user.firstName} ${user.lastName}`,
                                                user.taluka.name,
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <Switch
                                                        value={user.available}
                                                        onValueChange={() => toggleSwitch(index)}
                                                    />
                                                </View>,
                                            ]}
                                            flexArr={[1, 3.5, 3.5, 2]}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </TableWrapper>
                        </ScrollView>
                    </Table>
                </View>
            </View>
            <View style={styles.aadhar}>
                {selectedUser && <Card user={selectedUser} /> }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: "50%",
        maxHeight: "80%",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    aadhar: {
        flex: 0.5,
        // backgroundColor: 'yellow'
    },
    main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    container: {
        flex: 0.5,
        padding: 20,
        // backgroundColor: 'pink'
    },
});


