import React, { Component } from 'react';
import ArticleManager from '../../modules/ArticleManager';
import { Form, Button } from 'react-bootstrap';


class ArticleEditForm extends Component {
    state = {
        articleTitle: "",
        articleURL: "",
        articleSynopsis: "",
        articleTimestamp: "",
        articleUserId: "",
        loadingStatus: true

    };

    componentDidMount () {
        console.log("ARTICLE EDIT FORM: ComponentDid Mount");

        ArticleManager.getOneArticle(this.props.match.params.articleId)
        .then(article => {
            this.setState({
                articleTitle: this.article.title,
                articleURL: this.article.url,
                articleSynopsis: this.article.synopsis,
                articleTimestamp: this.article.timestamp,
                articleUserId: this.article.userId,
                loadingStatus: false
            });
        });
    };

    handleFieldChange = evt => {
        evt.preventDefault();
        this.setState ({ loadingStatus: true});
        const editedArticle = {
            id: this.props.match.params.articleId,
            title: this.state.articleTitle,
            url: this.state.articleURL,
            timestamp: this.state.articleTimestamp,
            userId: Number(this.state.articleUserId)
        };

        ArticleManager.updateArticle(editedArticle)
        .then(() => this.props.history.push("/articles"))
    }



    render () {
        return (
        <React.Fragment>
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" id="articleTitle" onChange={this.handleFieldChange} />

            </Form.Group>

            <Form.Group>
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" placeholder="Enter URL" id="articleURL" onChange={this.handleFieldChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Synopsis</Form.Label>
                <Form.Control type="text" placeholder="Enter Synopsis" id="articleSynopsis" onChange={this.handleFieldChange} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={this.updateExistingArticle}>
                Submit
            </Button>
        </Form>
        </React.Fragment>
        )};



}

export default ArticleEditForm