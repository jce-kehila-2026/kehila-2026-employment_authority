/**
 * mock-users.js
 * Definitions for different user personas to demonstrate RBAC (Role-Based Access Control).
 */

export const MOCK_ROLES = {
  GUEST: 'guest',
  EMPLOYER: 'employer',
  COORDINATOR: 'coordinator',
  ADMIN: 'admin'
};

export const MOCK_USERS = [
  {
    id: '1',
    email: 'guest@example.com',
    role: MOCK_ROLES.GUEST,
    displayName: 'Guest User'
  },
  {
    id: '2',
    email: 'employer@tech-jerusalem.com',
    role: MOCK_ROLES.EMPLOYER,
    displayName: 'Tech Jerusalem HR'
  },
  {
    id: '3',
    email: 'coordinator@jerusalem.gov.il',
    role: MOCK_ROLES.COORDINATOR,
    displayName: 'South Center Coordinator'
  },
  {
    id: '4',
    email: 'michal@jerusalem.gov.il',
    role: MOCK_ROLES.ADMIN,
    displayName: 'Michal (Director)'
  }
];