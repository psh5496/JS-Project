const pageNum = document.getElementsByClassName('page-button');
const pagePerBar = 5; // 한 줄 당 표시되는 페이지 수
const dataPerPage = 8; // 페이지 당 표시할 데이터 수
const DOMAIN = 'https://jsonplaceholder.typicode.com/posts';

const setPageInfo = ({ data }) => {
    const posts = data; // api를 통해 받아온 객체 배열
    const totalPage = Math.ceil(posts.length / dataPerPage); // 총 페이지 수
    console.log(totalPage);
};

const getPosts = async function () {
    const response = await axios.get(DOMAIN);
    setPageInfo(response);
};

getPosts();

for (let i = 0; i < pagePerBar; i++) {
    pageNum[i].addEventListener('click', () => {
        for (let j = 0; j < pagePerBar; j++) {
            pageNum[j].className = 'page-button';
        }
        pageNum[i].className = 'page-button active';
    });
}
