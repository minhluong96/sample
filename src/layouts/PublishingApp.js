import React from 'react';
import { connect } from 'react-redux';
import falcorModel from '../falcorModel';
import { bindActionCreators } from 'redux';
import articleActions from '../actions/article';

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class PublishingApp extends React.Component {
  constructor(props) {
    super(props);  
  }

  componentWillMount() {
    this._fetch();
  }

  async _fetch() {
    const articleLength = await falcorModel.
      getValue('articles.length').then( (length) => length );

    let articles = await falcorModel.
      get(['articles', { from: 0, to: articleLength - 1 },
      ['id', 'articleTitle', 'articleContent']]).
      then( (articlesData) => articlesData.json.articles );

    this.props.articleActions.articlesList(articles);
  }

  render() {
    let articleJSX = [];

    for(let articleKey in this.props){
      const article = this.props[articleKey];
      const currentArticleJSX = (
        <div key={articleKey}>
          <h2>{ article.articleTitle }</h2>
          <h3>{ article.articleContent }</h3>    
        </div>
      )
      articleJSX.push(currentArticleJSX)
    }

    return(
      <div>
        Our publishing app
        { articleJSX }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishingApp);