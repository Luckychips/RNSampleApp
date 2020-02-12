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

const BookThumbnail = styled.Image`
  width: 150px;
  height: 200px;
  resize-mode: contain;
`;

const BookInfo = props => {
    return (
        <Container>
            <BookThumbnail source={{uri: props.navigation.state.params.bookThumbnail}}  />
        </Container>
    );
};

export default BookInfo;