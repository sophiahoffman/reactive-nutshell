// Author: Sophia Hoffman

import APIManager from './APIManager'



export default {
    // sorted by timestamp articles from logged in user
    getUserArticles() {
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
        const route = `friends?loggedInUser=${localStorage.getItem("userId")}`
        return APIManager.get(route);
    },
    
    getArticles(friendsArray) {
        let route = `articles?userId=${localStorage.getItem("userId")}`
        friendsArray.forEach(element => {
            route += `&userId=${element}`
        })
        route += `&_sort=timestamp&_order=desc`
        return APIManager.get(route);
        
    }
}