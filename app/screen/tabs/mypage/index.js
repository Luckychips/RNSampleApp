import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Dimensions} from 'react-native';
import {KAKAO_RESTAPI_KEY} from 'react-native-dotenv';
import {Background, AdjustFitSafeArea} from '../../../components/Elements';
import {IPHONE_X_BOTTOM_NOTCH_HEIGHT, TAB_NAVIGATION_BAR_HEIGHT} from '../../../constants';
import BookItem from '../../../components/BookItem';
import HiddenToBottom from './HiddenToBottom';
const {height} = Dimensions.get('window');

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
        <>
            <StatusBar barStyle="dark-content" />
            <Background>
                <AdjustFitSafeArea height={height - IPHONE_X_BOTTOM_NOTCH_HEIGHT - TAB_NAVIGATION_BAR_HEIGHT}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={list}
                        numColumns={3}
                        renderItem={({ item, index}) => <BookItem index={index} item={item} numColumns={3} />}
                        keyExtractor={item => item.isbn}
                    />
                </AdjustFitSafeArea>
                <HiddenToBottom />
            </Background>
        </>
    );
};

export default MyPage;