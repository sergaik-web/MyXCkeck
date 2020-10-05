const fillTaskForm = (service: any, editName: string, setTask: any, form: any) => {
  service.getTask(editName).then((e: any) => {
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
