import APIManager from './APIManager'

const route = "articles"

export default {
    getAllArticles() {
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
        return APIManager.update(route, article);
    },

    postArticle(article) {
        return APIManager.post(route, article)
    }
}