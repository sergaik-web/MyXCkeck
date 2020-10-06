import React from 'react';
import { Button, Divider, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib';
import SubTasksItem from './SubTasksItem/SubTasksItem';

const TaskSubTasks: React.FC = () => {
  const taskTypes = ['Basic', 'Advanced', 'Extra', 'Fine'];
  return (
    <Form.List name="tasks">
      {(fields, { add, remove }) => {
        return (
          <div>
            <Divider>Subtasks</Divider>
            <ol>
              {fields.map((field) => (
                <SubTasksItem key={field.key} field={field} taskTypes={taskTypes} remove={remove} />
              ))}
            </ol>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                block
              >
                <PlusOutlined />
                Add subtask
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default TaskSubTasks;
