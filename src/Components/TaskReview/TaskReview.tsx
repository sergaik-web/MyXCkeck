import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Button, message, Select } from 'antd';
import { useSelector } from 'react-redux';
import {
  CrossCheckSessions,
  CrossCheckSessionStates,
  Review,
  ReviewRequest,
  ReviewStates,
  Task,
  TaskItem,
  Tasks,
  TaskScore,
  TaskStates,
  User,
} from '../../Reducer/reducer';
import './TaskReview.scss';
import { RootState } from '../../Store/Store';
import { TaskReviewForm } from './TaskForm';
import { getTaskCategories } from './getTaskCategories';
import {
  getAllCheckSessions,
  getAllTasks,
  getReviewRequestBySessionId,
  getTaskScoreByRequestId,
  getReviewByTaskScoreId,
  putTaskReview,
  postTaskReview,
} from '../../Service/Service';

const { Option } = Select;

export const TaskReview: React.FC = () => {
  const [task, setTask] = useState<Task>({
    name: '',
    taskId: '',
    author: '',
    state: TaskStates.DRAFT,
    categoriesOrder: [],
    subTasks: [],
  });

  const [tasks, setTasks] = useState<Tasks>({});
  const user = useSelector<RootState>((state) => state.user) as User;
  const [review, setReview] = useState<Review>({
    author: String(user.userName),
    state: ReviewStates.DRAFT,
    taskScoreId: '',
    subTasks: [],
  });
  const [crossCheckSessions, setCrossCheckSessions] = useState<CrossCheckSessions>({});
  const [foundReview, setFoundReview] = useState(false);

  useEffect(() => {
    getAllTasks().then((response) => setTasks(response as Tasks));
    getAllCheckSessions().then((allCrossCheckSessions) =>
      setCrossCheckSessions(allCrossCheckSessions as CrossCheckSessions)
    );
  }, [getAllTasks, getAllCheckSessions]);

  const onTaskSelect = useCallback(
    (sessionId: string) => {
      setFoundReview(false);
      const taskId = crossCheckSessions[sessionId].taskId;
      const selectedTask = tasks[taskId];
      setTask(selectedTask);
      getReviewRequestBySessionId(sessionId).then((reviewRequest) => {
        getTaskScoreByRequestId((reviewRequest as ReviewRequest).id).then((taskScore) => {
          setReview({
            ...review,
            taskScoreId: String((taskScore as TaskScore).id),
            subTasks: (taskScore as TaskScore).subTasks,
          });
          getReviewByTaskScoreId(String((taskScore as TaskScore).id)).then((reviewFromBD) => {
            setFoundReview(true);
            setReview(reviewFromBD as Review);
          });
        });
      });
    },
    [setTask, tasks, setReview, review, crossCheckSessions]
  );

  const categories = getTaskCategories(task, review);
  const onScoreChange = useCallback(
    (taskId: string | number, score: number, category: string) => {
      categories[category].find((el: TaskItem) => el.id === taskId).score = score;
      setReview({
        ...review,
        subTasks: review.subTasks.map((el) => {
          if (el.id === taskId) {
            return {
              ...el,
              score,
            };
          }
          return el;
        }),
      });
    },
    [categories, setReview, review]
  );

  const onSubmit = useCallback(() => {
    if (foundReview) {
      putTaskReview(String(review.id), review).then(() => {
        message.success('review updated');
      });
    } else {
      postTaskReview(review).then(() => {
        setFoundReview(true);
        message.success('review created');
      });
    }
  }, [review, foundReview]);

  return (
    <div id="task-review">
      <h1>Task Review</h1>
      <Select className="task-review-select" onChange={onTaskSelect}>
        {Object.entries(crossCheckSessions)
          .filter(([key, elem]) => {
            return elem.state === CrossCheckSessionStates.CROSS_CHECK;
          })
          .map(([key, el]) => {
            return (
              <Option key={key} value={key}>
                {tasks[el.taskId].name}
              </Option>
            );
          })}
      </Select>

      <TaskReviewForm
        taskName={task.name}
        taskAuthor={task.author}
        taskState={task.state}
        categories={categories}
        onScoreChange={onScoreChange}
      />

      <Button onClick={onSubmit} type="primary">
        Submit
      </Button>
    </div>
  );
};
