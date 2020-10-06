import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons/lib';
import React from 'react';
import classes from '../TaskSubTasks.module.scss';

interface SubTasksItemTypes {
  field: any;
  taskTypes: any;
  remove: any;
}

const SubTasksItem: React.FC<SubTasksItemTypes> = (props) => {
  const { field, taskTypes, remove } = props;
  const { Option } = Select;
  return (
    <li
      className={classes.subtaskListItem}
      key={field.key}
      style={{ borderBottom: 'solid 1px grey', marginTop: '15px' }}
    >
      <Form.Item
        {...field}
        wrapperCol={{ span: 22 }}
        key={field.key}
        name={[field.name, 'subtask-item']}
        fieldKey={[field.fieldKey, 'subtask-item']}
      >
        <Row justify="space-between">
          <Col span={14} offset={1}>
            <Form.Item
              name={[field.name, 'title']}
              rules={[{ required: true, message: 'Missing Subtask' }]}
              label="Subtask"
            >
              <Input placeholder="Subtask" />
            </Form.Item>
            <Form.Item
              name={[field.name, 'description']}
              rules={[{ required: false }]}
              label="Description"
            >
              <Input.TextArea placeholder="Description" autoSize={{ minRows: 4, maxRows: 10 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginLeft: '15px' }}
              name={[field.name, 'score']}
              rules={[{ required: true, message: 'Missing Cost' }]}
              label="Cost Subtask"
            >
              <Input type="number" placeholder="Cost" />
            </Form.Item>
            <Form.Item
              style={{ marginLeft: '15px' }}
              name={[field.name, 'category']}
              rules={[{ required: true, message: 'Missing Type Task' }]}
              label="Type Task"
            >
              <Select showSearch placeholder="Select Type Task" optionFilterProp="children">
                {taskTypes.map((taskType: any) => (
                  <Option key={taskType} value={taskType}>
                    {taskType}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginLeft: '15px' }}
              valuePropName="checked"
              name={[field.name, 'mentorCheck']}
              initialValue={false}
            >
              <Checkbox>Only Mentor?</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <MinusCircleOutlined
              onClick={() => {
                remove(field.name);
              }}
              style={{
                marginLeft: '15px',
                marginTop: '60px',
                fontSize: '20px',
                color: 'red',
              }}
            />
          </Col>
        </Row>
      </Form.Item>
    </li>
  );
};

export default SubTasksItem;
