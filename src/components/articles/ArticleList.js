import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ArticleCards from './ArticleCards';
import ArticleManager from '../../modules/ArticleManager';
import { Button } from 'react-bootstrap';


class ArticleList extends Component {
    state = {
        articles:[]
    }

    componentDidMount() {
        console.log("ARTICLE LIST: ComponentDidMount");
        ArticleManager.getAllArticles()
        .then(articles => {
            console.log(articles)
            this.setState({
                articles: articles,
            })
        })
    }

    deleteArticle = article => {
        ArticleManager.deleteArticle(article)
        .then(() => {
            ArticleManager.getAllArticles()
            .then((newArticles) => {
                this.setState({
                    articles: newArticles
                })
            })
        })
    }

    render() {
        console.log("ARTICLE LIST: Render");

        return (
            <React.Fragment>
            <div className="button-new" align="center">
                <Button variant="primary" type="button" onClick={() => this.props.history.push("articles/new")}>New Article</Button>
            </div>
            <div className="container-cards" align="center">
                {this.state.articles.map(article => 
                <ArticleCards
                key={article.id} 
                article={article} 
                deleteArticle = {this.deleteArticle}
                {...this.props}
                /> )}
            </div>
            </React.Fragment>
        )
    }
}



export default ArticleList