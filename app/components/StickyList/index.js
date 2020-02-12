import React from 'react';
import {SectionList} from 'react-native';
import styled from 'styled-components';

const HeaderBox = styled.View`
  width: 100%;
  padding: 15px;
  background-color: #ababff;
`;
const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const ItemBox = styled.View`
  padding: 7px;
  background-color: #ffffff;
  border-bottom-width: ${props => props.lastItem ? 0 : 1}px;
  border-bottom-color: #dddddd;
`;
const ItemText = styled.Text`
  font-size: 16px;
  font-weight: 300;
`;

const Header = props => {
    return (
        <HeaderBox>
            <HeaderText>{props.title}</HeaderText>
        </HeaderBox>
    );
};

const Item = props => {
    return (
        <ItemBox lastItem={props.sections.data.length - 1 === props.index}>
            <ItemText>{props.text}</ItemText>
        </ItemBox>
    );
};

const StickyList = props => {
    return (
        <SectionList
            sections={props.list}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index,section }) => <Item index={index} sections={section} text={item} />}
            renderSectionHeader={({ section: { title } }) => <Header title={title} />}
        />
    );
};

export default StickyList;