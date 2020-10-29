import React from 'react';
import { Route, Switch } from 'react-router';
import { Row, Col } from 'antd';
import Navbar from './Navbar/Navbar';
import Header from '../../Components/Header/Header';
import SessionsList from '../../Components/CheckSession/SessionsList/SessionsList';
import Auth from '../../Components/Auth/Auth';
import CheckSession from '../../Components/CheckSession/CheckSession';
import DisputeSelector from '../../Components/Dispute/DisputeSelector/DisputeSelector';
import TasksList from '../../Components/TasksList/TasksList';
import Selfcheck from '../../Components/Selfcheck/Selfcheck';
import { TaskReview } from '../../Components/TaskReview/TaskReview';
import SelectingTask from '../../Components/SelectingTask/SelectingTask';
import TasksCreator from '../../Components/TasksCreator/TasksCreator';
import Score from '../Score/Score';
import ReviewRequests from '../ReviewRequests/ReviewRequests';

// import Auth from '../../Components/Auth/Auth';
// const Main: React.FC = (state) => {
// const { userName }: any = state;

// if (!userName) {
//   return <Auth />;
// }

const Main: React.FC = () => {
  return (
    <div className="main">
      <Header />
      <Row>
        <Col>
          <Navbar />
        </Col>
        <Col flex="auto">
          <Switch>
            <Route path="/checksession/list" component={SessionsList} />
            <Route path="/authorization" component={Auth} />
            <Route path="/checksession" component={CheckSession} />
            <Route path="/dispute" component={DisputeSelector} />
            <Route path="/tasks-list" component={TasksList} />
            <Route path="/self-check" component={Selfcheck} />
            <Route path="/task-review" component={TaskReview} />
            <Route path="/submit-task" component={SelectingTask} />
            <Route path="/task-create" component={TasksCreator} />
            <Route path="/score" component={Score} />
            <Route path="/review-requests" component={ReviewRequests} />
          </Switch>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
