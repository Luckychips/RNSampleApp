import React, {useState, useEffect} from 'react';
import {FlatList, View, ActivityIndicator, Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import styled from 'styled-components';
import {KAKAO_RESTAPI_KEY} from 'react-native-dotenv';
import {Background, AdjustFitSafeArea} from '../../../components/Elements';
import CurtainToPull from './CurtainToPull';
const {width, height} = Dimensions.get('window');

const GridItem = props => {
    return (
        <View style={{width: width / 3}}>
            <Image
                style={{width: '100%', height: 200, resizeMode: 'contain'}}
                source={{uri: props.item.thumbnail}}
                PlaceholderContent={<ActivityIndicator />}
            />
        </View>
    );
};

const MyPage = () => {
    const [list, setList] = useState([]);
    const [rendered, setRendered] = useState(false);
    useEffect(() => {
        setRendered(true);
    }, []);
    useEffect(() => {
        if (rendered) {
            (async () => {
                await retrieve();
            })();

            setRendered(false);
        }
    }, [rendered]);
    const retrieve = async () => {
        try {
            // title (제목에서 검색) or isbn (ISBN에서 검색) or publisher (출판사에서 검색) or person(인명에서 검색)
            const response = await fetch('https://dapi.kakao.com/v3/search/book?target=title&query=인스타그램', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            setList(toJson.documents);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Background bgColor={'#1f1f1f'}>
            <AdjustFitSafeArea>
                <FlatList
                    data={list}
                    numColumns={3}
                    renderItem={({ item}) => <GridItem item={item} />}
                    keyExtractor={item => item.isbn}
                />
            </AdjustFitSafeArea>
            <CurtainToPull />
        </Background>
    );
};

export default MyPage;