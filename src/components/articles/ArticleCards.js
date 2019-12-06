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
                <div className="card articleCard">
                    <Card>
                        <div className = "card-content">
                            <Card.Body>
                                <h2 className="friendCardTitle">{this.props.article.title}</h2><hr />
                                <h3 className="article-content"><a href={this.props.article.url}>{this.props.article.url}</a></h3>
                                <h3 className="article-content">{this.props.article.synopsis}</h3><hr />
                                <Button variant="primary" type="button" className="article-button" onClick={() => this.props.history.push(`/articles/${this.props.article.id}/edit`)}>Edit</Button>
                                <Button variant="primary" type="button" className="article-button" onClick={() => this.props.deleteArticle(this.props.article.id)}>Delete</Button>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            )
        } else {
            return (
                <div className="card articleCard">
                    <Card>
                        <div className = "card-content friendCard">
                            <Card.Body>
                                <h2 className="friendCardTitle">{this.props.article.title}</h2><hr />
                                <h3 className="article-content"><a href={this.props.article.url}>{this.props.article.url}</a></h3>
                                <h3 className="article-content">{this.props.article.synopsis}</h3><hr />
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
