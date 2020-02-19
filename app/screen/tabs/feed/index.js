import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {KAKAO_RESTAPI_KEY} from 'react-native-dotenv';
import styled from 'styled-components';
import StickyList from '../../../components/StickyList';
const {width, height} = Dimensions.get('window');
const Container = styled.SafeAreaView`
  width: ${width}px;
  min-height: ${height}px;
`;

const FeedPage = () => {
    const [keyword, setKeyword] = useState('parasite');
    const [data, setData] = useState([
        {
            title: '웹문서',
            data: []
        },
        {
            title: '동영상',
            data: []
        },
        {
            title: '이미지',
            data: []
        },
        {
            title: '블로그',
            data: []
        },
        {
            title: '팁',
            data: []
        },
        {
            title: '책',
            data: []
        },
        {
            title: '카페',
            data: []
        }
    ]);
    useEffect(() => {
        (async () => {
            await fetchDocs();
            // await fetchVideos();
            // await fetchImages();
            // await fetchBlogs();
            // await fetchBooks();
            // await fetchCafes();
        })();
    }, []);
    const inject = async (toJson, targetIndex, key) => {
        let origin = data.slice();
        let docs = [];
        toJson.documents.map((item) => {
            switch (key) {
                case 'image_url':
                    docs.push(item.image_url);
                    break;
                case 'blog':
                    docs.push(item.blogname + ' (' + item.url + ')');
                    break;
                case 'book':
                    docs.push(item.title + ' [' + item.publisher + ']');
                    break;
                case 'cafe':
                    docs.push(item.title + ' (' + item.cafename + ')')
                    break;
                default:
                    docs.push(item.title);
            }
        });

        origin[targetIndex] = {
            title: origin[targetIndex].title,
            data: docs
        };

        setData(origin);
    };
    const fetchAPI = async (url, targetIndex, key) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            await inject(toJson, targetIndex, key);
        } catch (e) {
            console.log(e);
        }
    };
    const fetchDocs = async () => {
        const url = 'https://dapi.kakao.com/v2/search/web?query=' + keyword;
        await fetchAPI(url, 0);
    };
    const fetchVideos = async () => {
        const url = 'https://dapi.kakao.com/v2/search/vclip?query=' + keyword;
        await fetchAPI(url, 1);
    };
    const fetchImages = async () => {
        const url = 'https://dapi.kakao.com/v2/search/image?query=' + keyword;
        await fetchAPI(url, 2, 'image_url');
    };
    const fetchBlogs = async () => {
        const url = 'https://dapi.kakao.com/v2/search/blog?query=' + keyword;
        await fetchAPI(url, 3, 'blog');
    };
    const fetchBooks = async () => {
        const url = 'https://dapi.kakao.com/v3/search/book?target=title&query=' + keyword;
        await fetchAPI(url, 5, 'book');
    };
    const fetchCafes = async () => {
        const url = 'https://dapi.kakao.com/v2/search/cafe?query=' + keyword;
        await fetchAPI(url, 6, 'cafe');
    };

    return (
        <>
            <Container>
                <StickyList list={data} />
            </Container>
        </>
    );
};

export default FeedPage;