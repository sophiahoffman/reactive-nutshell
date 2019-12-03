import APIManager from './APIManager'



export default {
    getAllArticles() {
        const route = `articles?_userId=${localStorage.getItem("id")}`
        return APIManager.get(route);
    },

    getOneArticle(article) {
        const route = `articles/${article.id}`;
        return APIManager.get(route);
    },

    deleteArticle(article) {
        const route = `articles/${article.id}`;
        return APIManager.delete(route);
    },

    updateArticle(article) {
        const route = `articles/${article.id}`;
        return APIManager.update(route, article);
    },

    postArticle(article) {
        const route = `articles`
        return APIManager.post(route, article)
    }
}