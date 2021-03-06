import { Action } from 'redux';
import { SelectedTaskAction } from '../Actions/Actions';
import {
  AUTH_GITHUB_SUCCESS,
  CHANGE_SELECTED_TASK_INFO,
  CHANGE_REVIEW,
  DISPUTE_SELECT,
  REQUESTS,
  STOP_LOADING,
} from '../Actions/actionTypes';

type stateType = {
  loaded: boolean;
  user: User;
  selectedTaskId: null | string;
  checkSessionId: null | string;
  review: any;
};

export enum UserRoles {
  Author = 'Author',
  Student = 'student',
  Supervisor = 'supervisor',
  CourseManager = 'course_manager',
}

export enum TaskStates {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export type User = {
  githubId: null | number;
  role: UserRoles[];
  userName: string | null;
};

export type Users = {
  [index: string]: User;
};

export type TaskItem = {
  id: string;
  score: number;
  minScore: number;
  maxScore: number;
  category: string;
  title: string;
  description: string;
};

export type Task = {
  taskId: string;
  name: string;
  author: string;
  state: TaskStates;
  categoriesOrder: string[];
  subTasks: TaskItem[];
};

export type Tasks = {
  [fieldName: string]: Task;
};

export type TaskScoreItem = {
  id?: number | string;
  score: number;
  comment: string;
};

export type TaskScore = {
  id?: string;
  reviewRequestId: string;
  subTasks: TaskScoreItem[];
};

export enum CrossCheckSessionStates {
  DRAFT = 'DRAFT',
  REQUESTS_GATHERING = 'REQUESTS_GATHERING',
  CROSS_CHECK = 'CROSS_CHECK',
  COMPLETED = 'COMPLETED',
}

export type Attendee = {
  githubId: string;
  reviewerOf: string[];
};

export type CrossCheckSession = {
  name: string;
  state: CrossCheckSessionStates;
  taskId: string;
  coefficient: number;
  startDate: string;
  endDate: string;
  crossCheck: {
    discardMinScore: boolean;
    discardMaxScore: boolean;
    minReviewsAmount: number;
    desiredReviewersAmount: number;
    attendees: Attendee[];
  };
};

export type CrossCheckSessions = {
  [index: string]: CrossCheckSession;
};

export enum ReviewRequestStates {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  COMPLETED = 'COMPLETED',
}

export type ReviewRequest = {
  id: string;
  crossCheckSessionId: string;
  author: string;
  task: string;
  state: ReviewRequestStates;
  selfGrade: TaskScore;
};

export enum ReviewStates {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  DISPUTED = 'DISPUTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type Review = {
  id?: string;
  author: string;
  state: ReviewStates;
  taskScoreId: string;
  subTasks: TaskScoreItem[];
};

export enum DisputeStates {
  ONGOING = 'ONGOING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type Dispute = {
  reviewId: string;
  state: DisputeStates;
  idem: string;
  comment: string;
  suggestedScore: number;
};

export type AuthSuccessAction = Action & { user: User };

const userPersistKey = 'user';

function deserializeUser() {
  try {
    return JSON.parse(String(localStorage.getItem(userPersistKey) || undefined)) as User;
  } catch (e) {
    return {
      userName: 'sergaik-web',
      githubId: null,
      role: [UserRoles.Author],
    } as User;
  }
}

const initialState: stateType = {
  loaded: false,
  user: deserializeUser(),
  selectedTaskId: null,
  checkSessionId: null,
  review: null,
};

type XCheckActions = Action | AuthSuccessAction | SelectedTaskAction;

const reducer = (state = initialState, action: any) => {
  const { user } = action as AuthSuccessAction;

  switch (action.type) {
    case REQUESTS:
      return {
        ...state,
        loaded: true,
      };
    case AUTH_GITHUB_SUCCESS:
      localStorage.setItem(userPersistKey, JSON.stringify(user));
      return {
        ...state,
        user,
      };
    case STOP_LOADING:
      return {
        ...state,
        loaded: false,
      };
    case CHANGE_SELECTED_TASK_INFO: {
      const { checkSessionId, selectedTaskId } = (action as SelectedTaskAction).payload;
      return {
        ...state,
        selectedTaskId,
        checkSessionId,
      };
    }
    case CHANGE_REVIEW: {
      return {
        ...state,
        review: (action as any).payload,
      };
    }

    case DISPUTE_SELECT:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
