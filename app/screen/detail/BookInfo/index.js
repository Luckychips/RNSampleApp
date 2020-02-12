import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
`;

const BookInfo = () => {
    return (
        <Container>
            <Title>book page</Title>
        </Container>
    );
};

export default BookInfo;