// Author: Sophia Hoffman

import APIManager from './APIManager'



export default {
    getUserArticles(userId) {
        const route = `articles?userId=${localStorage.getItem("userId")}&_sort=timestamp&_order=desc`
        return APIManager.get(route);
    },

    getOneArticle(articleId) {
        const route = `articles/${articleId}`;
        return APIManager.get(route);
    },

    deleteArticle(articleId) {
        const route = `articles/${articleId}`;
        return APIManager.delete(route);
    },

    updateArticle(article) {
        const route = `articles`;
        return APIManager.update(route, article);
    },

    postArticle(article) {
        const route = `articles`
        return APIManager.post(route, article)
    },

    getFriends() {
        const route = `friends?loggedInUser = ${localStorage.getItem("userId")}`
        return APIManager.get(route);
    }
}