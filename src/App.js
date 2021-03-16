import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "pages/home";
import Settings from "pages/settings";
import Display from "pages/display";
import Product from "pages/product";
import Details from "pages/product/details";
import CreatItem from "pages/product/creatItem";
import NotFound from "pages/exception";

import styles from "./App.less";

export default (props) => {
  return (
    <div className={styles.app}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/settings" component={Settings} />
        <Route path="/display" component={Display} />
        <Route path="/product" component={Product} />
        <Route path="/details" component={Details} />
        <Route path="/creatItem" component={CreatItem} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

// import * as React from 'react';
// import { observer, inject } from 'mobx-react';
// // import HomeApi from './Api';

// import styles from './App.less';

// @inject('globalModel')
// @observer
// export default class App extends React.Component {
//   state = {
//     showText: true
//   }

//   componentWillReceiveProps(nextPorps){
//     console.log(nextPorps);
//   }

//   componentDidMount(){
//     console.log(this.props)
//   }

//   toggleShow = () =>{
//     this.setState({
//       showText: !this.state.showText
//     });

//     this.props.globalModel.changeUserName('jackson !')

//     // const list = HomeApi.getList().then(rs => console.log(rs));
//   }

//   render() {
//     return (
//       <div className={ styles.app }>
//         <button onClick={this.toggleShow}>click me pls</button> <br />
//         {this.props.globalModel.username}
//         {this.state.showText && <div>this is my Father's world! </div>}
//       </div>
//     )
//   }
// }
