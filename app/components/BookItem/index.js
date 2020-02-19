import React from 'react';
import {ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';
import styled from 'styled-components';
const {width, height} = Dimensions.get('window');
const ItemBox = styled.View`
  width ${props => props.width}px;
  margin-left: ${props => props.ml}px;
  margin-right: ${props => props.mr}px;
`;
const ItemTitleBox = styled.View`
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 5px;
  padding-bottom: 15px; 
`;
const ItemTitle = styled.Text`
  font-size: 13px;
  color: #1f1f1f;
`;

const BookItem = props => {
    const margin = 10;
    const getItemMargin = target => {
        if (props.numColumns < 2 && props.numColumns % 2 === 0) {
            return 0;
        }

        if (target.includes('left') && props.index % props.numColumns === 0) {
            return margin;
        }

        if (target.includes('right') && props.index % props.numColumns === props.numColumns - 1) {
            return margin;
        }

        return margin / 2;
    };
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={props.moveToDetail}>
            <ItemBox
                width={width / props.numColumns - (margin * (props.numColumns + 1) / props.numColumns)}
                ml={getItemMargin('left')}
                mr={getItemMargin('right')}>
                <Image
                    style={{width: '100%', height: 180, resizeMode: 'contain'}}
                    source={props.item.thumbnail ? {uri: props.item.thumbnail} : require('../../assets/empty_book.jpg')}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <ItemTitleBox>
                    <ItemTitle>{props.item.title}</ItemTitle>
                </ItemTitleBox>
            </ItemBox>
        </TouchableOpacity>
    );
};

export default BookItem;