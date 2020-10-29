import React from 'react';
import {
  CheckCircleTwoTone,
  CodeTwoTone,
  FrownTwoTone,
  OrderedListOutlined,
  SnippetsTwoTone,
  TrophyTwoTone,
} from '@ant-design/icons';

const navbardata = [
  {
    name: 'Tasks List',
    path: '/tasks-list',
    icon: <OrderedListOutlined twoToneColor="rgb(245, 97, 97)" />,
  },
  {
    name: 'Submit Task',
    path: '/submit-task',
    icon: <CodeTwoTone twoToneColor="rgb(24, 144, 255)" />,
  },
  {
    name: 'Task Review',
    path: '/task-review',
    icon: <CheckCircleTwoTone twoToneColor="rgb(245, 97, 97)" />,
  },
  {
    name: 'Dispute',
    path: '/dispute',
    icon: <FrownTwoTone twoToneColor="rgb(137, 184, 44)" />,
  },
  {
    name: 'Score',
    path: '/score',
    icon: <TrophyTwoTone twoToneColor="rgb(255, 18, 18)" />,
  },
  {
    name: 'Review Requests',
    path: '/review-requests',
    icon: <SnippetsTwoTone twoToneColor="#3ff4a1" />,
  },
  {
    name: 'Check Session',
    path: '/checksession',
    icon: <SnippetsTwoTone twoToneColor="#4af81e" />,
  },
];

export default navbardata;
