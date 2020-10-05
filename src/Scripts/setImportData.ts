import refactorImportSubTasks from './refactorImportSubTasks';

const setImportData = (importType: any, form: any, task: any, setTask: any, setShowModal: any) => {
  setShowModal(false);
  let importTask;
  let importSubTasks;
  switch (importType) {
    case 'Json':
      importTask = JSON.parse((document.getElementById(importType) as HTMLInputElement).value);
      setTask(importTask);
      form.setFieldsValue({
        taskName: importTask.name,
        authorName: importTask.author,
        typeState: importTask.state,
        tasks: importTask.subTasks,
      });
      break;
    case 'Markdown':
      importTask = (document.getElementById(importType) as HTMLInputElement).value;
      setTask({
        ...task,
        description: importTask,
      });
      break;
    case 'Rss':
      importTask = JSON.parse((document.getElementById(importType) as HTMLInputElement).value);
      importSubTasks = refactorImportSubTasks(importTask);
      setTask({
        ...task,
        description: importTask.information ? importTask.information : task.description,
        name: importTask.taskName,
        subTasks: importSubTasks,
      });
      form.setFieldsValue({
        taskName: importTask.taskName,
        tasks: importSubTasks,
      });
      break;
    default:
      break;
  }
};

export default setImportData;
