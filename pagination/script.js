const $pageNum = document.getElementsByClassName('page-button');
const PAGE_PER_BAR = 5; // 한 줄 당 표시되는 페이지 수
const DATA_PER_PAGE = 8; // 페이지 당 표시할 데이터 수
let posts; // api를 통해 받아온 객체 배열
let totalPage; // 총 페이지 수
const DOMAIN = 'https://jsonplaceholder.typicode.com/';

const getPageNum = (currentPage) => {
    const half = Math.floor(PAGE_PER_BAR / 2);
    let start;
    if(currentPage < 3) {
        start = 1;
    } else if(currentPage > totalPage - half) {
        start = (totalPage - PAGE_PER_BAR) + 1;
    } else {
        start = currentPage - half;
    }
    setPageNum(Array.from({length: PAGE_PER_BAR}, (_, i) => start + i));
};

const setPageNum = (pages) => {
    for(let i=0; i < PAGE_PER_BAR; i++) {
        $pageNum[i].innerText = pages[i];
    }
}

const setPageInfo = ({ data }) => {
    posts = data;
    totalPage = Math.ceil(posts.length / DATA_PER_PAGE); // 총 페이지 수
};

const getPosts = async function () {
    const response = await axios.get(DOMAIN + 'posts');
    setPageInfo(response);
};

getPosts();

for (let i = 0; i < PAGE_PER_BAR; i++) {
    $pageNum[i].addEventListener('click', () => {
        getPageNum($pageNum[i].innerText);
        for (let j = 0; j < PAGE_PER_BAR; j++) {
            $pageNum[j].classList.remove('active');
        }
        $pageNum[i].classList.add('active');
    });
}
