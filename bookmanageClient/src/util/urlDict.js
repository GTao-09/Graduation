const urlDict = {
    login: { // 登录拿token
        url: '/users/login',
        needLogin: false
    },
    bookSearch: { // 查询图书
        url: '/books/search',
        needLogin: true
    },
    bookAdd: { // 添加图书
        url: '/books/bookAdd',
        needLogin: true
    },
    bookEdit: { // 编辑图书
        url: '/books/bookEdit',
        needLogin: true
    },
    bookDelete: { // 删除图书
        url: '/books/bookDelete',
        needLogin: true
    },
    userSearch: {
        url: '/users/search',
        needLogin: true
    },
    userDelete: {
        url: '/users/userDelete',
        needLogin: true
    },
    userRegister: {
        url: '/users/register',
        needLogin: true
    },
    borrowingsSearch: {
        url: '/borrowings/search',
        needLogin: true
    },
    borrowingAdd: {
        url: '/borrowings/borrowingAdd',
        needLogin: true
    },
    borrowDelete: {
        url: '/borrowings/borrowDelete',
        needLogin: true
    }
}
export default urlDict
