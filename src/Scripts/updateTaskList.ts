const updateTaskList = (service: any, setAllTask: any) => {
  service.getAllTasks().then((allTasks: any) => {
    if (allTasks) {
      const keys = Object.keys(allTasks);
      const arrTasks: any = keys.map((key) => {
        allTasks[key].taskId = key;
        allTasks[key].key = key;
        return allTasks[key];
      });
      setAllTask(arrTasks);
    }
  });
};

export default updateTaskList;
