import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        q: 'general',
        pageSize: 9
    }

    static propTypes = {
        q: PropTypes.string,
        pageSize: PropTypes,
    }
    
    constructor(){
        super();
        console.log("Hello I am a Constructor from News component");
        this.state = {
            articles: [],
            loading: true,
            page:1
        }
    }

    async componentDidMount(){
        let url =`https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=356a355bfded48539c922d662be12405&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
         let parsedData = await data.json()
         console.log(parsedData);
         this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

    handlePrevClick = async ()=>{
       console.log("Previous");
       let url =`https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=356a355bfded48539c922d662be12405&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
       this.setState({loading: true});
         let data = await fetch(url);
         let parsedData = await data.json()
         this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async ()=>{
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=356a355bfded48539c922d662be12405&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
        })
        }
    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: "40px 0px"}}>FlashFacts - Top Headlines</h1>
        {this.state.loading && <Spinner />} 
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0, 35):""} description={element.description?element.description.slice(0, 70):""} imageUrl={element.urlToImage} newsUrl={element.url} />
         </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    )
  }
}

export default News
