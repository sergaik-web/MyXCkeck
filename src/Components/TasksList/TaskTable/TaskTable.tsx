import { Button, Table } from 'antd';
import { DiffOutlined, CloudSyncOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import tasksListColumns from '../tasksListColumns';

const TasksTable = (props: any) => {
  const { userName, userRole, onDeleteTask, allTasks, onUpdateTaskList } = props;
  return (
    <Table
      pagination={{ position: ['bottomCenter'], pageSize: 6 }}
      bordered
      size="small"
      columns={tasksListColumns(userName, userRole, onDeleteTask)}
      dataSource={allTasks}
      footer={() => (
        <Link to="/task-create">
          <Button
            disabled={
              !(
                userRole.includes('Author') ||
                userRole.includes('Supervisor') ||
                userRole.includes('Course manager')
              )
            }
            type="primary"
            size="large"
            icon={<DiffOutlined />}
          >
            Create Task
          </Button>
        </Link>
      )}
      title={() => (
        <>
          <h1 style={{ alignItems: 'center', display: 'flex' }}>
            Tasks List
            <Button
              size="large"
              style={{ marginLeft: '25px' }}
              type="default"
              icon={<CloudSyncOutlined />}
              onClick={onUpdateTaskList}
            >
              Update List
            </Button>
          </h1>
        </>
      )}
    />
  );
};

export default TasksTable;
