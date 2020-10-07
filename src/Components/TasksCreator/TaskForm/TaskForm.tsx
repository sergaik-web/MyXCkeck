import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { useHistory } from 'react-router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ImportModal from './ImportModal/ImportModal';
import exportJsonData from '../../../Scripts/exportJsonData';
import submitTask from '../../../Scripts/submitTask';
import setImportData from '../../../Scripts/setImportData';
import fillTaskForm from '../../../Scripts/fillTaskForm';
import TaskMainInfo from '../TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskSubTasks from '../TaskSubTasks/TaskSubTasks';
import TaskSubmitButton from '../TaskSubmitButton/TaskSubmitButton';
import Hoc from '../../Hoc/Hoc';

import classes from './TaskForm.module.scss';
import 'antd/dist/antd.css';
import 'easymde/dist/easymde.min.css';

interface TasksFormProps {
  editTaskMode: boolean;
  editTaskName: string;
  service: any;
}

const TaskForm: React.FC<TasksFormProps> = (props) => {
  const history = useHistory();
  const { service, editTaskMode, editTaskName } = props;
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editMode, setEditMode] = useState(editTaskMode);
  const [editName, setEditName] = useState(editTaskName);
  const [valueMde, setValueMde] = useState({ value: () => {} });
  const [task, setTask] = useState({
    name: '',
    author: '',
    state: '',
    subTasks: [],
    description: '',
  });

  useEffect(() => {
    if (editMode && editName) {
      fillTaskForm(service, editName, setTask, form);
    }
  }, [editMode, editName, service, form]);

  const onFinish = (values: { [key: string]: any }) => {
    const icon = <ExclamationCircleOutlined />;
    submitTask(
      values,
      valueMde,
      editMode,
      editName,
      service,
      setEditMode,
      setEditName,
      history,
      icon
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };

  const exportJson = () => {
    exportJsonData(editMode, valueMde, form);
  };

  const importJson = () => {
    setModalType('Json');
    setShowModal(true);
  };

  const importMarkdown = () => {
    setModalType('Markdown');
    setShowModal(true);
  };

  const importRss = () => {
    setModalType('Rss');
    setShowModal(true);
  };

  const onOkModal = (importType: string) => {
    setImportData(importType, form, task, setTask, setShowModal);
  };

  const onCancelModal = () => {
    setShowModal(false);
  };

  return (
    <Form
      form={form}
      className={classes.taskForm}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <TaskMainInfo
        exportJson={exportJson}
        importJson={importJson}
        importRss={importRss}
        importMarkdown={importMarkdown}
      />
      <TaskDescription
        getInstans={(instance: any) => setValueMde(instance)}
        description={task.description}
      />
      <TaskSubTasks />
      <TaskSubmitButton editMode={editMode} />
      <ImportModal
        importType={modalType}
        visible={showModal}
        onOkModal={(importType: string) => onOkModal(importType)}
        onCancelModal={onCancelModal}
      />
    </Form>
  );
};

export default Hoc()(TaskForm);
