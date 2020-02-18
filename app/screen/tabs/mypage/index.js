import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, RefreshControl, Dimensions} from 'react-native';
import {KAKAO_RESTAPI_KEY} from 'react-native-dotenv';
import {Background, AdjustFitSafeArea} from '../../../components/Elements';
import {IPHONE_X_BOTTOM_NOTCH_HEIGHT, TAB_NAVIGATION_BAR_HEIGHT} from '../../../constants';
import BookItem from '../../../components/BookItem';
import HiddenToBottom from './HiddenToBottom';
const {height} = Dimensions.get('window');

const MyPage = props => {
    const [searchKeyword, setSearchKeyword] = useState('인스타그램');
    const [list, setList] = useState([]);
    const [rendered, setRendered] = useState(false);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setRendered(true);
    }, []);
    useEffect(() => {
        if (rendered) {
            (async () => {
                await retrieve();
            })();
        }
    }, [rendered]);
    const retrieve = async () => {
        try {
            const url = 'https://dapi.kakao.com/v3/search/book?target=title&query=' + searchKeyword + '&page=' + page;
            // title (제목에서 검색) or isbn (ISBN에서 검색) or publisher (출판사에서 검색) or person(인명에서 검색)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            setList(list.concat(toJson.documents));
            setRendered(false);
        } catch (e) {
            console.log(e);
        }
    };
    const refresh = () => {
        if (!rendered) {
            const keywords = ['심리학', '머신러닝', '영어', '세계사', '게임'];
            setSearchKeyword(keywords[Math.floor(Math.random() * keywords.length)]);
            setPage(1);
            setList([]);
            setRendered(true);
        }
    };
    const more = () => {
        if (list.length > 0 && !rendered) {
            setPage(page + 1);
            setRendered(true);
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
                        renderItem={({ item, index}) => {
                            return (
                                <BookItem
                                    index={index}
                                    item={item}
                                    numColumns={3}
                                    moveToDetail={() => props.navigation.push('DetailBookInfoPage', {
                                        bookTitle: item.title,
                                        bookThumbnail: item.thumbnail
                                    })}
                                />
                            );
                        }}
                        keyExtractor={item => item.isbn}
                        onEndReached={more}
                        onEndReachedThreshold={0.1}
                        refreshControl={
                            <RefreshControl
                                tintColor={'#3562FF'}
                                refreshing={rendered}
                                onRefresh={refresh}
                            />
                        }
                    />
                </AdjustFitSafeArea>
                <HiddenToBottom />
            </Background>
        </>
    );
};

export default MyPage;