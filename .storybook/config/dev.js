import { devdock as dock } from './devdock';

export const devauth = {
  username: 'demo@naraway.io',
  password: '0000',
  pavilionId: '1:1:1',

  loggedIn: true,
  cineroomIds: ['1:1:1:1', '1:1:1:2', '1:1:1:3'],
  citizenSessionId: 'db851f94-eb25-454c-85fb-7f84761b662d',
  citizen: {
    pavilionId: '1:1:1',
    loginId: 'demo@naraway.io',
    email: 'demo@naraway.io',
    displayName: 'Nara User',
    additionalInformation: {
      citizenUserId: 'c6b8d53b-1102-4a3c-8ed6-347213983b02',
      citizenSessionId: 'db851f94-eb25-454c-85fb-7f84761b662d',
    },
  },
  token: {
    access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiYWRtaW5AbmV4dHJlZS5pbyIsInBhdmlsaW9uSWQiOiIxOjE6MSIsInVzZXJfbmFtZSI6ImFkbWluQG5leHRyZWUuaW8iLCJkaXNwbGF5TmFtZSI6Iu2ZjSDrgpjrnbwiLCJzY29wZSI6WyJjaXRpemVuIl0sImNpdGl6ZW5Vc2VySWQiOiIyY2U5MWRiMC1kNDBlLTQxYTEtYjIzYy1iYmQzYjM0NjIwYWEiLCJleHAiOjE2NTc3MTMyNjQsImp0aSI6IktIUDNZLTAyOWp5U0wweGRyNDJBcVc5d1pQYyIsImVtYWlsIjoiYWRtaW5AbmV4dHJlZS5pbyIsImNpbmVyb29tSWRzIjpbIjE6MToxOjEiLCIxOjE6MToyIl0sImNsaWVudF9pZCI6Im5hcmEifQ.1i_lcuAk3E8_9Nj-cYi3MFG7JmKnjPhbXfPCDb_G8JU',
    refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiYWRtaW5AbmV4dHJlZS5pbyIsInBhdmlsaW9uSWQiOiIxOjE6MSIsInVzZXJfbmFtZSI6ImFkbWluQG5leHRyZWUuaW8iLCJkaXNwbGF5TmFtZSI6Iu2ZjSDrgpjrnbwiLCJzY29wZSI6WyJjaXRpemVuIl0sImNpdGl6ZW5Vc2VySWQiOiIyY2U5MWRiMC1kNDBlLTQxYTEtYjIzYy1iYmQzYjM0NjIwYWEiLCJhdGkiOiJLSFAzWS0wMjlqeVNMMHhkcjQyQXFXOXdaUGMiLCJleHAiOjE2NTkwMTE4NTYsImp0aSI6IkxsRGJfQnpXLWJaODFQRlF0czRXZDlIdDNZcyIsImVtYWlsIjoiYWRtaW5AbmV4dHJlZS5pbyIsImNpbmVyb29tSWRzIjpbIjE6MToxOjEiLCIxOjE6MToyIl0sImNsaWVudF9pZCI6Im5hcmEifQ.kZN5JKklUKa-aEMy-ij68nFwmvG3l0CQSUPOkj8LuT0',
  },
};

export const devdock = {
  dock,
  currentPavilion: dock.pavilion,
  currentCitizen: dock.citizen,
  currentCineroom: dock.cinerooms[0].cineroom,
  currentAudience: dock.cinerooms[0].audience,
  currentStage: dock.cinerooms[0].stages[0].stage,
  currentActor: dock.cinerooms[0].stages[0].actor,
  currentKollection: dock.cinerooms[0].stages[0].kollections[0].kollection,
  currentStageRoles: dock.cinerooms[0].stages[0].kollections[0].stageRoles.map(role => role.code),
  currentDramaRoles: dock.cinerooms[0].stages[0].kollections[0].stageRoles[0].dramaRoles.map(role => role.code),
};
