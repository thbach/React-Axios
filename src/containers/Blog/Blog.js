import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';

// import NewPost from './NewPost/NewPost';
const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  activeClassName="my-active"
                  activeStyle={{
                    color: '#fa923f',
                    textDecoration: 'underline'
                  }}
                  to="/posts"
                  exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post'
                  }}>
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/new-post" render={() => <h1>NewPost</h1>} /> */}
        <Switch>
          {this.state.auth && (
            <Route path="/new-post" component={AsyncNewPost} />
          )}
          <Route path="/posts" component={Posts} />
          <Route render={() => <h1>NotFound</h1>} />
          {/* <Redirect from="/" to="/posts" />> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
