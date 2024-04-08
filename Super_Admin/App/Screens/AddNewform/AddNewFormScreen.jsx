import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

const Checkbox = ({ checked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={[styles.checkbox, checked && styles.checked]}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
};

const CrossBox = ({ checked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={[styles.checkbox, checked && styles.checked]}>
      {checked && <Text style={styles.checkmark}>✗</Text>}
    </TouchableOpacity>
  );
};

const AddNewFormScreen = () => {
  const [formTitle, setFormTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [saved, setSaved] = useState(false);

  const addQuestion = () => {
    const questionNumber = questions.length + 1;
    setQuestions([...questions, { number: questionNumber, question: '', type: 'checkbox', answer: '', remark: '' }]);
  };

  const handleQuestionChange = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = text;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = value;
    setQuestions(updatedQuestions);
  };

  const handleRemarkChange = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].remark = text;
    setQuestions(updatedQuestions);
  };

  const saveForm = () => {
    if (formTitle.trim() === '') {
      Alert.alert('Form Title Required', 'Please enter a title for the form.');
      return;
    }

    for (const question of questions) {
      if (question.question.trim() === '') {
        Alert.alert('Empty Question', 'Please fill in all the questions before saving.');
        return;
      }
    }

    const formData = {
      formTitle: formTitle,
      questions: questions,
    };
    // Here you can save formData to your database
    console.log(JSON.stringify(formData));
    setSaved(true);
  };

  const renderQuestion = (question, index) => {
    return (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.questionNumber}>{question.number}.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your question"
          value={question.question}
          onChangeText={(text) => handleQuestionChange(index, text)}
        />
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxGroup}>
            <Checkbox checked={question.answer === 'yes'} onChange={() => handleAnswerChange(index, 'yes')} />
            <Text style={styles.label}>Yes</Text>
          </View>
          <View style={styles.checkboxGroup}>
            <CrossBox checked={question.answer === 'no'} onChange={() => handleAnswerChange(index, 'no')} />
            <Text style={styles.label}>No</Text>
          </View>
        </View>
        <TextInput
          style={styles.remarkInput}
          placeholder="Enter remark"
          value={question.remark}
          onChangeText={(text) => handleRemarkChange(index, text)}
        />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!saved && (
        <TextInput
          style={[styles.input, styles.titleInput]}
          placeholder="Enter form title"
          value={formTitle}
          onChangeText={setFormTitle}
        />
      )}
      {saved && (
        <Text style={[styles.title, styles.savedTitle]}>{formTitle}</Text>
      )}
      {questions.map((question, index) => renderQuestion(question, index))}
      <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
        <Text style={styles.addButtonText}>Add Question</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={saveForm}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  savedTitle: {
    marginBottom: 20,
  },
  titleInput: {
    height: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  addButton: {
    backgroundColor: 'orange', // Change button color to yellow-orange
    padding: 10,
    borderRadius: 15, // Smaller border radius
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: 'orange', // Change button color to yellow-orange
    padding: 10,
    borderRadius: 15, // Smaller border radius
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    marginRight: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkmark: {
    fontSize: 18,
  },
  checked: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  questionNumber: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  remarkInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  questionContainer: {
    marginBottom: 20,
  },
});

export default AddNewFormScreen;

