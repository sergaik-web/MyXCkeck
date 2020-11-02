import { message, Modal } from 'antd';
import createEssence from './createEssenceTask';

const { confirm } = Modal;

const submitTask = (
  values: any,
  valueMde: any,
  editMode: boolean | undefined,
  editName: string | undefined,
  service: any,
  setEditMode: any,
  setEditName: any,
  history: any
) => {
  if (values.tasks || values.tasks.lenght === 0) {
    confirm({
      title: 'Back to the list of tasks?',
      content: 'Do you want to go back to the full list of all assignments, or continue editing?',
      okText: 'Back to Tasks List',
      cancelText: 'Continue Editing',
      onOk() {
        const description = valueMde.value();
        const taskEssence = createEssence(values, description);
        if (editMode) {
          service.putTask(taskEssence, editName);
        } else {
          service.postNewTask(taskEssence).then((e: any) => {
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
          service.putTask(taskEssence, editName);
        } else {
          service.postNewTask(taskEssence).then((e: any) => {
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
