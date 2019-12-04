// Author: Sophia Hoffman

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Card , Button } from 'react-bootstrap';
import './ArticleCards.css';




class ArticleCards extends Component {

// renders different card depending on if it's the logged in user or friend article
    render() {
        const loggedInUser = localStorage.getItem("userId");
        if (Number(loggedInUser) === Number(this.props.article.userId)) {
            return (
                <div className="card">
                    <Card>
                        <div className = "card-content">
                            <Card.Body>
                                <h2>{this.props.article.title}</h2>
                                <h3><a href={this.props.article.url}>{this.props.article.url}</a></h3>
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
                        <div className = "card-content friendCard">
                            <Card.Body>
                                <h2>{this.props.article.title}</h2>
                                <h3><a href={this.props.article.url}>{this.props.article.url}</a></h3>
                                <h3>{this.props.article.synopsis}</h3>
                            </Card.Body>
                            {/* </div> */}
                        </div>
                    </Card>
                </div>
            )
        }
    };
}

export default ArticleCards
