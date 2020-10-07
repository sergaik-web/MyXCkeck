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
    <li className={classes.subtaskListItem} key={field.key}>
      <Form.Item
        {...field}
        key={field.key}
        name={[field.name, 'subtask-item']}
        fieldKey={[field.fieldKey, 'subtask-item']}
      >
        <Row>
          <Col span={12} offset={1}>
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
              <Input.TextArea placeholder="Description" autoSize={{ minRows: 1, maxRows: 10 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className={classes.marginLeft}
              name={[field.name, 'score']}
              rules={[{ required: true, message: 'Missing Cost' }]}
              label="Cost Subtask"
            >
              <Input type="number" placeholder="Cost" />
            </Form.Item>
            <Row>
              <Form.Item
                className={classes.marginLeft}
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
                className={classes.marginLeft}
                valuePropName="checked"
                name={[field.name, 'mentorCheck']}
                initialValue={false}
              >
                <Checkbox>Only Mentor?</Checkbox>
              </Form.Item>
            </Row>
          </Col>
          <Col>
            <MinusCircleOutlined
              className={classes.minusCircleOutlined}
              onClick={() => {
                remove(field.name);
              }}
            />
          </Col>
        </Row>
      </Form.Item>
    </li>
  );
};

export default SubTasksItem;
