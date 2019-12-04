import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card , Button } from 'react-bootstrap'




class ArticleCards extends Component {


    render() {
        const loggedInUser = localStorage.getItem("userId");
        if (Number(loggedInUser) === Number(this.props.article.userId)) {
            return (
                <div className="card">
                    <Card>
                        <div className = "card-content">
                            <Card.Body>
                                <h2>{this.props.article.title}</h2>
                                <h3>{this.props.article.url}</h3>
                                <h3>{this.props.article.synopsis}</h3>
                                <Button variant="primary" type="button" onClick={() => this.props.history.push(`/articles/${this.props.article.id}/edit`)}>Edit</Button>
                                <Button variant="primary" type="button" onClick={() => this.props.deleteArticle(this.props.article.id)}>Delete</Button>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            )
        } else {
            return (
                <div className="card">
                    <Card>
                        <div className = "card-content">
                            <Card.Body>
                                <h2>{this.props.article.title}</h2>
                                <h3>{this.props.article.url}</h3>
                                <h3>{this.props.article.synopsis}</h3>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            )
        }
    };
}

export default ArticleCards
