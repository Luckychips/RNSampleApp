import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {KAKAO_RESTAPI_KEY} from 'react-native-dotenv';
import styled from 'styled-components';
import StickyList from '../../../components/StickyList';
const {width} = Dimensions.get('window');
const Container = styled.SafeAreaView`
  width: ${width}px;
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
            await fetchVideos();
            await fetchImages();
            await fetchBlogs();
            await fetchBooks();
            await fetchCafes();
        })();
    }, []);
    const inject = async (toJson, targetIndex, key) => {
        let origin = data.slice();
        let docs = [];
        toJson.documents.map((item) => {
            if (key.includes('image_url')) {
                docs.push(item.image_url);
            } else if (key.includes('blog')) {
                docs.push(item.blogname + ' (' + item.url + ')');
            } else if (key.includes(('book'))) {
                docs.push(item.title + ' [' + item.publisher + ']');
            } else if (key.includes('cafe')) {
                docs.push(item.title + ' (' + item.cafename + ')')
            } else {
                docs.push(item.title);
            }

        });

        origin[targetIndex] = {
            title: origin[targetIndex].title,
            data: docs
        };

        setData(origin);
    };
    const fetchDocs = async () => {
        try {
            const url = 'https://dapi.kakao.com/v2/search/web?query=' + keyword;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            await inject(toJson, 0);
        } catch (e) {
            console.log(e);
        }
    };
    const fetchVideos = async () => {
        try {
            const url = 'https://dapi.kakao.com/v2/search/vclip?query=' + keyword;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            await inject(toJson, 1);
        } catch (e) {
            console.log(e);
        }
    };
    const fetchImages = async () => {
        try {
            const url = 'https://dapi.kakao.com/v2/search/image?query=' + keyword;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            await inject(toJson, 2, 'image_url');
        } catch (e) {
            console.log(e);
        }
    };
    const fetchBlogs = async () => {
        try {
            const url = 'https://dapi.kakao.com/v2/search/blog?query=' + keyword;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            await inject(toJson, 3, 'blog');
        } catch (e) {
            console.log(e);
        }
    };
    const fetchBooks = async () => {
        try {
            const url = 'https://dapi.kakao.com/v3/search/book?target=title&query=' + keyword;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            await inject(toJson, 5, 'book');
        } catch (e) {
            console.log(e);
        }
    };
    const fetchCafes = async () => {
        try {
            const url = 'https://dapi.kakao.com/v2/search/cafe?query=' + keyword;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'KakaoAK ' + KAKAO_RESTAPI_KEY
                }
            });
            const toJson = await response.json();
            await inject(toJson, 6, 'cafe');
        } catch (e) {
            console.log(e);
        }
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