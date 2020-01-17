import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
const {width, height} = Dimensions.get('window');
const Container = styled.SafeAreaView`
    width: ${width}px;
    height: ${height}px;
    background-color: #afbbff;
`;
const FeedPage = () => {
    return <Container />;
};

export default FeedPage;