import React, {Component} from 'react';
//import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount() {
    axios
      .get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatePosts = posts.map(posts => {
          return {
            ...posts,
            author: 'Max'
          };
        });
        this.setState({posts: updatePosts});
      })
      .catch(error => {
        this.setState({error: true});
        console.log(error);
      });
  }

  postSelectedHandler = id => {
    this.setState({selectedPostId: id});
  };

  render() {
    let posts = <p stype={{textAlign: 'center'}}> something went wrong! </p>;
    if (!this.state.error) {
      posts = this.state.posts.map(posts => {
        return (
          <Post
            clicked={() => this.postSelectedHandler(posts.id)}
            key={posts.id}
            title={posts.title}
            author={posts.author}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
