import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage('user', {
  username: '',
  typicalName: '',
  userLevel: null,
  userId: '',
  isLoggedIn: false,
});

export const companyAtom = atomWithStorage('company', {
  officialName: '',
  typicalName: '',
  companyId: '',
  isLoggedIn: false,
});

export const authorizationAtom = atomWithStorage('authorization', {
  saleStatistics: ['businessOwner'],
  workersManagement: ['businessOwner', 'shiftManager'],
  dataManagement: ['businessOwner'],
  summary: ['businessOwner'],
});
