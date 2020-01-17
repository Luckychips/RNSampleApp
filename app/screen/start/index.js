import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationActions, StackActions} from 'react-navigation';
import styled from 'styled-components';
const Container = styled.View`
  flex: 1; 
  background-color: #99afd0;  
  justify-content: center;
`;
const SkipButton = styled.TouchableOpacity`
  background-color: black;  
  align-self: center;
  paddingVertical: 10px;
  paddingHorizontal: 15px;
`;
const SkipText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;
const StartPage = props => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1500);
    }, []);
    const skip = () => {
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: 'TabPage'}),
            ],
        });
        props.navigation.dispatch(resetAction);
    };
    return (
        <Container>
            <SkipButton onPress={skip}>
                <SkipText>Skip</SkipText>
            </SkipButton>
        </Container>
    );
};

export default StartPage;