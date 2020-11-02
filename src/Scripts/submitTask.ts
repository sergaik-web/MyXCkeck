import { message, Modal } from 'antd';
import createEssence from './createEssenceTask';
import { putTask, postNewTask } from '../Service/Service';

const { confirm } = Modal;

const submitTask = (
  values: any,
  valueMde: any,
  editMode: boolean | undefined,
  editName: string | undefined,
  setEditMode: any,
  setEditName: any,
  history: any,
  icon: any
) => {
  if (values.tasks || values.tasks.lenght === 0) {
    confirm({
      title: 'Back to the list of tasks?',
      icon,
      content: 'Do you want to go back to the full list of all assignments, or continue editing?',
      okText: 'Back to Tasks List',
      cancelText: 'Continue Editing',
      onOk() {
        const description = valueMde.value();
        const taskEssence = createEssence(values, description);
        if (editMode) {
          putTask(taskEssence, editName);
        } else {
          postNewTask(taskEssence).then((e: any) => {
            setEditMode(true);
            setEditName(e.name);
          });
        }
        setTimeout(() => history.push('/tasks-list'), 500);
      },
      onCancel() {
        const description = valueMde.value();
        const taskEssence = createEssence(values, description);
        if (editMode) {
          putTask(taskEssence, editName);
        } else {
          postNewTask(taskEssence).then((e: any) => {
            setEditMode(true);
            setEditName(e.name);
          });
        }
      },
    });
  } else {
    message.error('Create subtasks');
  }
};

export default submitTask;
