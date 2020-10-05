import { Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';

const tasksListColumns = (userName: any, userRole: any, onDeleteTask: any) => {
  return [
    {
      title: 'Name Task',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => text,
      sorter: (a: any, b: any) => {
        const wordA = a.name.toLowerCase();
        const wordB = b.name.toLowerCase();
        if (wordA < wordB) {
          return -1;
        }
        if (wordA > wordB) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: (a: any, b: any) => {
        const wordA = a.author.toLowerCase();
        const wordB = b.author.toLowerCase();
        if (wordA < wordB) {
          return -1;
        }
        if (wordA > wordB) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: 'Score',
      dataIndex: 'subTasks',
      key: 'subTasks',
      render: (subTasks: string | any[]) => {
        let score = 0;
        if (typeof subTasks !== 'string' && subTasks) {
          for (let i: any = 0; i < subTasks.length; i++) {
            if (subTasks[i].score > 0) {
              score += subTasks[i].score;
            }
          }
          return <p key={subTasks.length}>{score}</p>;
        }
        return <p>{score}</p>;
      },
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
      render: (tags: any) => {
        let color = tags.length > 5 ? 'green' : 'geekblue';
        if (tags === 'ARCHIVED') {
          color = 'volcano';
        }
        return (
          <Tag key={tags} color={color}>
            {tags.toUpperCase()}
          </Tag>
        );
      },
      sorter: (a: any, b: any) => a.state.length - b.state.length,
    },
    {
      title: 'Edit',
      key: 'edit',
      render: (text: any, record: any) => (
        <Link to={`/task-create/${record.taskId}`}>
          <Button
            disabled={
              !(
                (record.author === userName && userRole.includes('Author')) ||
                userRole.includes('Supervisor') ||
                userRole.includes('Course manager')
              )
            }
            size="small"
            type="primary"
            key={text}
            icon={<FormOutlined />}
          >
            Edit
          </Button>
        </Link>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text: any, record: any) => (
        <Button
          disabled={
            !(
              (record.author === userName && userRole.includes('Author')) ||
              userRole.includes('Supervisor') ||
              userRole.includes('Course manager')
            )
          }
          onClick={() => onDeleteTask(record.taskId)}
          size="small"
          key={text}
          type="primary"
          danger
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      ),
    },
  ];
};

export default tasksListColumns;
