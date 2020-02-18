import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';

const ButtonContainer = styled.TouchableOpacity`
  padding-left: 18px;
  padding-right: 45px;
`;

const BackButton = props => {
    return (
        <ButtonContainer onPress={() => props.navigation.goBack()}>
            <Icon
                color={'#1f1f1f'}
                name="chevron-left"
                size={25}
            />
        </ButtonContainer>
    );
};

export default BackButton;