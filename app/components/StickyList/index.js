import React from 'react';
import {SectionList} from 'react-native';
import {withNavigation} from 'react-navigation';
import styled from 'styled-components';

/*
* SectionList
*
* 뷰 내부에서만 헤더가 고정이 됨 같은 depth의 다른 뷰가 있으면,
* 컨텐츠 길이만큼 밑에서 스크롤 이벤트가 발생하고 헤더가 고정된다.
*
* */

const HeaderBox = styled.View`
  width: 100%;
  padding: 15px;
  background-color: #ababff;
`;
const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const ItemBox = styled.TouchableOpacity`
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
        <ItemBox lastItem={props.sections.data.length - 1 === props.index} onPress={() => {
            props.navigation.push('GoogleMapView');
        }}>
            <ItemText>{props.text}</ItemText>
        </ItemBox>
    );
};

const StickyList = props => {
    return (
        <SectionList
            sections={props.list}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index, section }) => {
                return (
                    <Item
                        navigation={props.navigation}
                        index={index}
                        sections={section}
                        text={item}
                    />
                );
            }}
            renderSectionHeader={({ section: { title } }) => <Header title={title} />}
        />
    );
};

export default withNavigation(StickyList);