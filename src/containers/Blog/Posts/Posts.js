import React, {Component} from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          };
        });
        this.setState({posts: updatedPosts});
        // console.log( response );
      })
      .catch(error => {
        console.log(error);
        // this.setState({error: true});
      });
  }

  postSelectedHandler = id => {
    // this.props.history.push({pathname: '/posts/' + id});
    this.props.history.push('/posts/' + id);
  };

  render() {
    let posts = <p stype={{textAlign: 'center'}}> something went wrong! </p>;
    if (!this.state.error) {
      posts = this.state.posts.map(posts => {
        return (
          // <Link to={'/' + posts.id} key={posts.id}>
          <Post
            key={posts.id}
            clicked={() => this.postSelectedHandler(posts.id)}
            title={posts.title}
            author={posts.author}
          />
          // </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + '/:id'}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
