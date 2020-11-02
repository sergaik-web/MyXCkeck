import { getTask } from '../Service/Service';

const fillTaskForm = (editName: string, setTask: any, form: any) => {
  getTask(editName).then((e: any) => {
    setTask(e);
    form.setFieldsValue({
      taskName: e.name,
      authorName: e.author,
      typeState: e.state,
      tasks: e.subTasks,
    });
  });
};

export default fillTaskForm;
