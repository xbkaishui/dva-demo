import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import fetch from 'dva/fetch';
import React from 'react';
import './index.html';
import CountApp from './Count.jsx';

// 1. Initialize
const app = dva();

// 2. Model
// Remove the comment and define your model.
app.model({
  namespace:'count',
  state :{
    record:0,
    current:0,
  },
  reducers :{
    add(state) {
      const newCurrent = state.current + 1;
     return { ...state,
       record: newCurrent > state.record ? newCurrent : state.record,
       current: newCurrent,
     };
   },
   minus(state){
     return { ...state, current: state.current - 1};
   }
 },
 effects : {
   *add(action , {call , put }){
     yield call(delay, 1000);
     yield put({ type: 'minus' });
   },
 },
});

function mapStateToProps(state) {
  return { count: state.count };
}
function delay(timeout){
  return new Promise(resolve => {
    setTimeout(resolve,timeout);
  })
}
const HomePage = connect(mapStateToProps)(CountApp);
// 3. Router
app.router(({ history }) =>
  <Router history={history}>
    <Route path="/" component={HomePage} />
  </Router>
);
console.log(app);
// 4. Start
app.start('#root');
