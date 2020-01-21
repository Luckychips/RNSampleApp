import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components';
import AnimatedPlaceholderTextInput from '../../../components/AnimatedPlaceholderTextInput';
const Container = styled.SafeAreaView`
  flex: 1; 
  background-color: #ffafcd;
`;
const ExplorePage = () => {
    const [helloText, setHelloText] = useState('');
    const [byeText, setByeText] = useState('');
    const [noonText, setNoonText] = useState('');
    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <AnimatedPlaceholderTextInput value={helloText} onChangeText={text => setHelloText(text)} placeholder="hello" />
                    <AnimatedPlaceholderTextInput value={byeText} onChangeText={text => setByeText(text)} placeholder="bye" />
                    <AnimatedPlaceholderTextInput value={noonText} onChangeText={text => setNoonText(text)} placeholder="noon" />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Container>
    );
};

export default ExplorePage;