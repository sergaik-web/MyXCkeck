import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, message } from 'antd';
import { Task, TaskItem, TaskScore } from '../../Reducer/reducer';
import { TaskReviewForm } from './TaskForm';
import { getTaskCategories } from './getTaskCategories';
import Header from '../Header/Header';
import {
  getTask,
  getTaskScoreByRequestId,
  putTaskScore,
  postTaskScore,
} from '../../Service/Service';

const SelfCheck: React.FC = () => {
  const { taskId, reviewRequestId } = useParams();
  const [foundTaskScore, setFoundTaskScore] = useState(false);
  const [task, setTask] = useState<Task>({ subTasks: [] as TaskItem[] } as Task);
  const [taskScore, setTaskScore] = useState<TaskScore>({
    reviewRequestId,
    subTasks: [],
  } as TaskScore);

  useEffect(() => {
    getTask(taskId)
      .then((foundTask: any) => {
        setTask(foundTask as Task);
        setTaskScore({
          ...taskScore,
          subTasks: (foundTask as Task).subTasks.map((el) => ({
            id: el.id,
            score: el.score,
            comment: '',
          })),
        });
      })
      .then(() => {
        getTaskScoreByRequestId(reviewRequestId).then((taskScoreFromBD: any) => {
          setFoundTaskScore(true);
          setTaskScore(taskScoreFromBD as TaskScore);
        });
      });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const categories = getTaskCategories(task, taskScore);

  const onScoreChange = (subTaskId: number | string, score: number, category: string) => {
    categories[category].find((el: TaskItem) => el.id === subTaskId).score = score;
    setTaskScore({
      ...taskScore,
      subTasks: taskScore.subTasks.map((el) => {
        if (el.id === subTaskId) {
          return {
            ...el,
            score,
          };
        }
        return el;
      }),
    });
  };
  const onSave = useCallback(() => {
    if (foundTaskScore) {
      putTaskScore(taskScore.id as string, taskScore).then(() => {
        message.success('task score updated');
      });
    } else {
      postTaskScore(taskScore).then(() => {
        setFoundTaskScore(true);
        message.success('task score created');
      });
    }
  }, [foundTaskScore, taskScore]);

  return (
    <div id="task-review">
      <Header />

      <TaskReviewForm
        taskState={task.state}
        taskAuthor={task.author}
        taskName={task.name}
        categories={categories}
        onScoreChange={onScoreChange}
      />

      <Button type="primary" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default SelfCheck;
