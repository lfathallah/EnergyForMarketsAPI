import ParksController from "./../controllers/ParksController.js";
import ParkRepository from "./../persistence/ParkRepository.js";
import {expect, jest} from '@jest/globals';

let parksController = new ParksController();
let parkRepository = new ParkRepository();

describe('Park controller', () => {
/*  beforeEach(() => {
    postgresClient = jasmine.createSpyObj('postgresClient', ['query']);
  });*/

    it('Should create a new park with its time blocks', async (done) => {
      let parkToCreate = {
        name: "name",
        address: "address",
        type: 1,
        timeBlocks: [
          {
            nbHours: 12,
            minPrice: 3,
            energyQuantity: 1.2
          }
        ]
      }
      let createdPark = {
        id: 1,
        name: "name",
        address: "address",
        type: 1
      }
      const value = 2;
      const spy = jest.spyOn(parkRepository, 'createPark')
          .mockImplementation(async (a) => Promise.resolve(createdPark));

      const result = await parksController.addPark(parkToCreate);

      expect(result).toEqual(createdPark);
      expect(spy).toHaveBeenCalled();
    });
/*
  it('Should create a new park with its time blocks', (done) => {
    // given
    let newUsers = [
      new Account(1, 'alex.john', '00001','Alex', 'John', STATES.CREATED, null),
      new Account(2, 'alex.john2', '00002','Alex', 'John2', STATES.CREATED, null),
      new Account(3, 'alex.john', '00003','John', 'Doe', STATES.CREATED, null),
    ];
    let existingUsers = [
      new Account(1, 'alex.john', '00001','Alex', 'John', STATES.CREATED, null),
      new Account(2, 'alex.john2', '00002','Alex', 'John2', STATES.CREATED, null),
    ];

    let firstCall = true;

    // then
    postgresClient.query.and.callFake(async (query) => {
      if(firstCall) {
        console.log('**** Fake called 1 ', query);
        expect(query.includes('VALUES (\'alex.john\', \'00003\', \'John\', \'Doe\', \'CREATED\')')).toBe(true);

        firstCall = false;
        return {
          rows: [{
            id: 1
          }]
        };
      }
      done();
    });

    // when
    lambda.insertUsers('agency', newUsers, existingUsers, postgresClient)
  })

  it(`Should insert the account's related site`, (done) => {
    // given
    let newUsers = [
      new Account(1, 'alex.john', '00001','Alex', 'John', STATES.CREATED, null),
    ];

    let firstCall = true;

    // then
    postgresClient.query.and.callFake(async (query) => {
      if(firstCall) {
        console.log('**** Fake called 1 ', query);

        firstCall = false;
        return {
          rows: [{
            id: 1
          }]
        };
      } else {
        console.log('**** Fake called 2 ', query);
        expect(query.includes('VALUES (\'1\', \'1\')')).toBe(true);
      }
      done();
    });

    // when
    lambda.insertUsers(new Site(1, 'sitename'), newUsers, [], postgresClient)
  })

  it(`Should insert the account's related roles`, (done) => {
    // given
    let account = new Account(1, 'alex.john', '00001','Alex', 'John', STATES.CREATED, null);
    account.addRoles('MOBIME');

    let newUsers = [
      account,
    ];

    let call = 0;

    // then
    postgresClient.query.and.callFake(async (query) => {
      if(call === 0) {
        return {
          rows: [{
            id: 1
          }]
        };
      } else if(call === 2) {
        console.log('**** Fake called 3 ', query);

        done();
      }
      call++;
    });

    // when
    lambda.insertUsers(new Site(1, 'sitename'), newUsers, [], postgresClient)
  })

  it('Should delete users that are no longer referenced in the mssql users', (done) => {
    //given
    let newUsers = [
      new Account(1, 'alex.john', '00001','Alex', 'John', STATES.CREATED, null),
      new Account(2, 'alex.john2', '00002','Alex', 'John2', STATES.CREATED, null),
    ];
    let existingUsers = [
      new Account(3, 'alex.john', '00001','Alex', 'John', STATES.CREATED, null),
      new Account(4, 'alex.john2', '00004','Alex', 'John2', STATES.CREATED, null),
    ];

    let alreadyCalled = false;

    // then
    postgresClient.query.and.callFake((query, params) => {
      if(!alreadyCalled) {
        alreadyCalled = true;
        return false;
      }
      console.log('**** Fake called', params);
      expect(params[0]).toBe(4)
      done();
    });

    // when
    lambda.deleteUsers('agency', newUsers, existingUsers, postgresClient)
  })*/
})
