import firebase from 'firebase/app';
import 'firebase/database';
import { message } from 'antd';
import { CrossCheckSession, Review, Task, TaskScore, User } from '../Reducer/reducer';

const API_KEY = 'AIzaSyDzqqVu_zSTm33lzJmSTRwgNyTbUib_B2w';
const app = firebase.initializeApp({
  apiKey: API_KEY,
  databaseURL: 'https://x-check-dc82a.firebaseio.com/',
});
const db = app.database();

function normalizeSubTask<T>(subTask: T, index: number) {
  return {
    ...subTask,
    id: (subTask as { id?: number }).id || index,
  };
}

function normalizeTask(task: Task) {
  if (task.subTasks) {
    return {
      ...task,
      subTasks: Object.values(task.subTasks)
        .map(normalizeSubTask)
        .map((el) => ({
          ...el,
          maxScore: el.score < 0 ? 0 : el.score,
          minScore: Math.min(0, el.score),
        })),
    };
  }
  return {
    ...task,
  };
}

function normalizeTaskScore(taskScore: TaskScore) {
  return {
    ...taskScore,
    subTasks: Object.values(taskScore.subTasks).map(normalizeSubTask),
  };
}
function normalizeReview(review: Review) {
  return {
    ...review,
    subTasks: Object.values(review.subTasks).map(normalizeSubTask),
  };
}

function normalizeCheckSession(session: CrossCheckSession) {
  if (session.crossCheck instanceof Object) {
    return {
      ...session,
      crossCheck: {
        ...session.crossCheck,
        attendees: Object.values(session.crossCheck.attendees || {}),
      },
    };
  }
  return session;
}

const postNewTask = async (data: any) => {
  return db
    .ref('/tasks')
    .push(data)
    .then((newTask) => {
      message.success('Created New Task');
      return newTask;
    })
    .catch(() => {
      message.error('Ups cannot Created New Task');
    });
};

const putTask = async (data: any, taskName: string | undefined) => {
  return db
    .ref(`/tasks/${taskName}`)
    .set(data)
    .then((task) => {
      message.success('Save Change');
      return task;
    })
    .catch(() => {
      message.error('UPS Save Change');
    });
};

const getTask = async (taskName: string) => {
  const ref = db.ref(`/tasks/${taskName}`);
  return new Promise((resolve) =>
    ref.on('value', function onTaskValue(snapshot) {
      ref.off('value', onTaskValue);
      resolve(normalizeTask(snapshot.toJSON() as Task));
    })
  );
};

const getTaskScoreByRequestId = (requestId: string) => {
  const ref = db.ref('/taskScores');
  return new Promise((resolve) => {
    ref
      .orderByChild('reviewRequestId')
      .equalTo(requestId)
      .on('child_added', function onChildTaskScore(snapshot) {
        ref.off('child_added', onChildTaskScore);
        resolve(normalizeTaskScore({ ...snapshot.toJSON(), id: snapshot.key } as TaskScore));
      });
  });
};

const getReviewRequestBySessionId = (checkSessionId: string) => {
  const ref = db.ref('/reviewRequests');
  return new Promise((resolve) => {
    ref
      .orderByChild('checkSessionId')
      .equalTo(checkSessionId)
      .on('child_added', function onChildReviewRequest(snapshot) {
        ref.off('child_added', onChildReviewRequest);
        resolve({
          ...snapshot.toJSON(),
          id: snapshot.key,
        });
      });
  });
};

const getReviewByTaskScoreId = (taskScoreId: string) => {
  const ref = db.ref('/reviews');
  return new Promise((resolve) => {
    ref
      .orderByChild('taskScoreId')
      .equalTo(taskScoreId)
      .on('child_added', function onChildReview(snapshot) {
        ref.off('child_added', onChildReview);
        resolve(
          normalizeReview({
            ...(snapshot.toJSON() as Review),
            id: String(snapshot.key),
          })
        );
      });
  });
};

const putTaskScore = (id: string, taskScore: TaskScore) => {
  return db.ref(`/taskScores/${id}`).set(taskScore);
};

const getCheckSession = (sessionId: string) => {
  const ref = db.ref(`/checkSessions/${sessionId}`);
  return new Promise((resolve) => {
    ref.on('value', function onCheckSessionValue(snapshot) {
      ref.off('value', onCheckSessionValue);
      resolve(normalizeCheckSession(snapshot.toJSON() as CrossCheckSession));
    });
  });
};

const getAllUsers = () => {
  const ref = db.ref('/users');
  return new Promise((resolve) => {
    ref.on('value', function onAllUsers(snapshot) {
      ref.off('value', onAllUsers);
      resolve(snapshot.toJSON());
    });
  });
};

const delTask = async (taskName: string) => {
  return db
    .ref(`/tasks/${taskName}`)
    .remove()
    .then(() => {
      message.success('Task Deleted');
    })
    .catch(() => message.error('Task No Deleted'));
};

const getAllTasks = async () => {
  const ref = db.ref('/tasks');
  return new Promise((resolve, reject) =>
    ref.on('value', function onAllTasks(snapshot) {
      if (snapshot.val()) {
        message.success('Received data from the server');
        ref.off('value', onAllTasks);
        resolve(
          Object.fromEntries(
            Object.entries(snapshot.toJSON() || {}).map(([key, task]) => [key, normalizeTask(task)])
          )
        );
      } else {
        reject(message.error('Received data from the server'));
      }
    })
  );
};

const getAllCheckSessions = () => {
  return new Promise((resolve) => {
    const ref = db.ref('/checkSessions');
    ref.on('value', function onAllCheckSessions(snapshot) {
      ref.off('value', onAllCheckSessions);
      resolve(
        Object.fromEntries(
          Object.entries(snapshot.toJSON() || {}).map(([key, checkSession]) => [
            key,
            normalizeCheckSession(checkSession),
          ])
        )
      );
    });
  });
};

const postNewUser = async (user: User) => {
  return db.ref(`/users`).push(user);
};

const postTaskReview = async (review: Review) => {
  return db.ref('/reviews').push(review);
};

const putTaskReview = (id: string, review: Review) => {
  return db.ref(`/reviews/${id}`).set(review);
};

const postTaskScore = async (taskScore: TaskScore) => {
  return db.ref('/taskScores').push(taskScore);
};

const postCheckSession = (session: CrossCheckSession) => {
  return db.ref('/checkSessions').push(session);
};

const putCheckSession = (sessionId: string, session: CrossCheckSession) => {
  return db.ref(`/checkSessions/${sessionId}`).set(session);
};

export {
  putCheckSession,
  postCheckSession,
  postTaskScore,
  putTaskReview,
  postTaskReview,
  postNewUser,
  getAllCheckSessions,
  getAllTasks,
  delTask,
  getAllUsers,
  getCheckSession,
  putTaskScore,
  getReviewByTaskScoreId,
  getReviewRequestBySessionId,
  getTaskScoreByRequestId,
  getTask,
  putTask,
  postNewTask,
};
