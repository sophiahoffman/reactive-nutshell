import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import ArticleManager from '../../modules/ArticleManager';


class ArticleForm extends Component {
    state = {
        articleTitle: "",
        articleURL: "",
        articleSynopsis: "",
        articleTimestamp: "",
        loadingStatus: false
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id]=evt.target.value;
        console.log(stateToChange)
        this.setState(stateToChange)
    };

    constructNewArticle = evt => {
        evt.preventDefault();
        if (this.state.articleTitle === "" || this.state.articleURL === "" || this.state.articleSynopsis === "") {
            window.alert("Please complete all fields");
        } else {
            this.setState({loadingStatus: true});
            const article = {
                userId: localStorage.getItem("userId"),
                title: this.state.articleTitle,
                url: this.state.articleURL,
                synopsis: this.state.articleSynopsis,
                timestamp: Date.now()
            }
            ArticleManager.postArticle(article)
            .then(() => this.props.history.push("/articles"));
        }


    };

    render() {
        return (

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
            <Button variant="primary" type="button" onClick={this.constructNewArticle}>
                Submit
            </Button>
            </Form>
        )}
}

export default ArticleForm