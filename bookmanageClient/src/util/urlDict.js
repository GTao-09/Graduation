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
    }
}
export default urlDict
