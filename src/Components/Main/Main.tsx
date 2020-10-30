import React from 'react';
import { Route, Switch } from 'react-router';
import { Row, Col } from 'antd';
import Navbar from './Navbar/Navbar';
import Header from '../Header/Header';
import SessionsList from '../CheckSession/SessionsList/SessionsList';
import Auth from '../Auth/Auth';
import CheckSession from '../CheckSession/CheckSession';
import DisputeSelector from '../Dispute/DisputeSelector/DisputeSelector';
import TasksList from '../TasksList/TasksList';
import Selfcheck from '../Selfcheck/Selfcheck';
import { TaskReview } from '../TaskReview/TaskReview';
import SelectingTask from '../SelectingTask/SelectingTask';
import TasksCreator from '../TasksCreator/TasksCreator';
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
        <Col flex="1 1 300px">
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
