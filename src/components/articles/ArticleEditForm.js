// Author: Sophia Hoffman

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
                articleId: article.id,
                articleTitle: article.title,
                articleURL: article.url,
                articleSynopsis: article.synopsis,
                articleTimestamp: article.timestamp,
                articleUserId: article.userId,
                loadingStatus: false
            });
        });
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id]=evt.target.value;
        console.log(stateToChange)
        this.setState(stateToChange)
    }; 
        
    updateExistingArticle = evt => {    
        evt.preventDefault();
        if (this.state.articleTitle === "" || this.state.articleURL === "" || this.state.articleSynopsis === "") {
            window.alert("Please complete all fields");
        } else {
            this.setState ({ loadingStatus: true});
            const editedArticle = {
                id: Number(this.state.articleId),
                title: this.state.articleTitle,
                url: this.state.articleURL,
                synopsis: this.state.articleSynopsis,
                timestamp: this.state.articleTimestamp,
                userId: Number(this.state.articleUserId)
            };

            ArticleManager.updateArticle(editedArticle)
            .then(() => this.props.history.push("/articles"))
        }
    }



    render () {
        return (
        <React.Fragment>
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" id="articleTitle" default value={this.state.articleTitle} onChange={this.handleFieldChange}  />

            </Form.Group>

            <Form.Group>
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" id="articleURL" default value={this.state.articleURL} onChange={this.handleFieldChange}  />
            </Form.Group>
            <Form.Group>
                <Form.Label>Synopsis</Form.Label>
                <Form.Control type="text" id="articleSynopsis" 
                default value={this.state.articleSynopsis} onChange={this.handleFieldChange}  />
            </Form.Group>
            <Button variant="primary" type="button" onClick={this.updateExistingArticle}>
                Submit
            </Button>
        </Form>
        </React.Fragment>
        )};



}

export default ArticleEditForm