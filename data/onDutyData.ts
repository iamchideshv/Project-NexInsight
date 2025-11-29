import { OnDutyRequest } from '../types';

export let onDutyData: OnDutyRequest[] = [
  {
    id: 1,
    reason: 'Attending symposium on AI at a nearby college.',
    date: '2024-07-25',
    hours: [2, 3], // 11:10-12:00 and 12:00-12:50
    status: 'Approved'
  },
  {
    id: 2,
    reason: 'Participating in inter-college sports event.',
    date: '2024-07-26',
    hours: [0, 1, 2, 3, 4, 5, 6],
    status: 'Pending'
  },
  {
    id: 3,
    reason: 'Personal appointment.',
    date: '2024-07-22',
    hours: [5, 6],
    status: 'Rejected'
  },
];
