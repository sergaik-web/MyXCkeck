import { Modal } from 'antd';
import updateTaskList from './updateTaskList';
import { delTask } from '../Service/Service';

const { confirm } = Modal;

const deleteTask = (taskName: any, setAllTask: any, icon: any) => {
  confirm({
    title: 'Are you sure delete this task?',
    icon,
    content: 'A deleted task cannot be restored',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      delTask(taskName).then(() => setTimeout(() => updateTaskList(setAllTask), 1500));
    },
  });
};

export default deleteTask;
