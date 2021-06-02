const $pageNumButtonArr = document.getElementsByClassName('page-button');
const PAGE_PER_BAR = 5; // 한 줄 당 표시되는 페이지 수
const DATA_PER_PAGE = 8; // 페이지 당 표시할 데이터 수
const DOMAIN = 'https://jsonplaceholder.typicode.com/';
const postsObj = (function () {
    let posts = [];
    return {
        setPosts: function (_posts) {
            posts = _posts;
        },
        getPosts: function () {
            return posts;
        },
    };
})();
const totalPageObj = (function () {
    let totalPage = 0;
    return {
        setTotalPage: function (_totalPage) {
            totalPage = _totalPage;
        },
        getTotalPage: function () {
            return totalPage;
        },
    };
})();

const setPageNum = (currentPage) => {
    const totalPage = totalPageObj.getTotalPage();
    const half = Math.floor(PAGE_PER_BAR / 2);
    let start;
    if (currentPage <= half) {
        start = 1;
    } else if (currentPage > totalPage - half) {
        start = totalPage - PAGE_PER_BAR + 1;
    } else {
        start = currentPage - half;
    }

    const pages = Array.from({ length: PAGE_PER_BAR }, (_, i) => start + i);
    for (let i = 0; i < PAGE_PER_BAR; i++) {
        $pageNumButtonArr[i].innerText = pages[i];
    }
};

const setPageInfo = ({ data: posts }) => {
    postsObj.setPosts(posts);
    totalPageObj.setTotalPage(Math.ceil(posts.length / DATA_PER_PAGE));
};

const fetchPosts = async function () {
    const response = await axios.get(DOMAIN + 'posts');
    setPageInfo(response);
};

const clickPageNumButton = (i) => {
    setPageNum($pageNumButtonArr[i].innerText);
    for (let j = 0; j < PAGE_PER_BAR; j++) {
        $pageNumButtonArr[j].classList.remove('active');
    }

    if (2 < $pageNumButtonArr[i].innerText && $pageNumButtonArr[i].innerText < 12) {
        $pageNumButtonArr[2].classList.add('active');
    } else {
        $pageNumButtonArr[i].classList.add('active');
    }
};

for (let i = 0; i < PAGE_PER_BAR; i++) {
    $pageNumButtonArr[i].addEventListener('click', () => clickPageNumButton(i));
}

fetchPosts();
