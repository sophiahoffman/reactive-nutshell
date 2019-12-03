import APIManager from './APIManager'



export default {
    getAllArticles() {
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
    }
}