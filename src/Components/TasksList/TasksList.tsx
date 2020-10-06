import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import deleteTask from '../../Scripts/deleteTask';
import updateTaskList from '../../Scripts/updateTaskList';
import TasksTable from './TaskTable/TaskTable';
import Hoc from '../Hoc/Hoc';
import Header from '../Header/Header';
import classes from './TasksList.module.scss';

interface allTasksType {
  service: any;
  userName: string | null;
  userRole: [string];
}

const TasksList: React.FC<allTasksType> = (props) => {
  const { service, userName, userRole } = props;
  const [allTasks, setAllTask] = useState();

  useEffect(() => {
    updateTaskList(service, setAllTask);
  }, [service, setAllTask]);

  const onDeleteTask: any = (taskName: any) => {
    const icon = <ExclamationCircleOutlined />;
    deleteTask(service, taskName, setAllTask, icon);
  };

  return (
    <div className={classes.allTasks}>
      <Header />
      <TasksTable
        userName={userName}
        userRole={userRole}
        onDeleteTask={onDeleteTask}
        allTasks={allTasks}
        onUpdateTaskList={updateTaskList}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userName: state.user.userName,
    userRole: state.user.role,
  };
};

export default connect(mapStateToProps)(Hoc()(TasksList));
