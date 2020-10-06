import { Modal } from 'antd';
import updateTaskList from './updateTaskList';

const { confirm } = Modal;

const deleteTask = (service: any, taskName: any, setAllTask: any, icon: any) => {
  confirm({
    title: 'Are you sure delete this task?',
    icon,
    content: 'A deleted task cannot be restored',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      service
        .delTask(taskName)
        .then(() => setTimeout(() => updateTaskList(service, setAllTask), 1500));
    },
  });
};

export default deleteTask;
