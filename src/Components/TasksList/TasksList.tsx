import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import deleteTask from '../../Scripts/deleteTask';
import updateTaskList from '../../Scripts/updateTaskList';
import TasksTable from './TaskTable/TaskTable';
import classes from './TasksList.module.scss';

interface allTasksType {
  userName: string | null;
  userRole: [string];
}

const TasksList: React.FC<allTasksType> = (props) => {
  const { userName, userRole } = props;
  const [allTasks, setAllTask] = useState();

  useEffect(() => {
    updateTaskList(setAllTask);
  }, [setAllTask]);

  const onDeleteTask: any = (taskName: any) => {
    const icon = <ExclamationCircleOutlined />;
    deleteTask(taskName, setAllTask, icon);
  };

  return (
    <div className={classes.allTasks}>
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

export default connect(mapStateToProps)(TasksList);
