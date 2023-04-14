import EnergyParksController from '../controllers/EnergyParksController.js';

describe("EnergyParksController", () => {
  let parksController;
  let parkRepositoryMock;

  beforeEach(() => {
    parkRepositoryMock = jasmine.createSpyObj("ParkRepository", [
      "createPark",
    ]);

    parksController = new EnergyParksController(parkRepositoryMock);
  });

  describe("addPark", () => {
    it("should create a new park with the given data", async () => {
      // given
      let parkData = {
        name: 'Energy Park',
        type_id: 1,
        address: 'Paris'
      };
      let park = {
        id: 1,
        name: 'Energy Park',
        type_id: 1,
        address: 'Paris'
      };

      parkRepositoryMock.createPark.and.returnValue(park);

      // when
      const result = await parksController.addPark(parkData);

      // Assert
      expect(parkRepositoryMock.createPark).toHaveBeenCalledWith(parkData);
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe(
          `The new Energy Park with name ${park.name} has been created successfully with an auto-generated ID [${park.id}]`
      );
    });

    it("should return an error message if park creation fails", async () => {
      // given
      let parkData = {
        name: 'Energy Park',
        type_id: 1,
        address: 'Paris'
      };

      const errorMessage = "Error creating park";
      parkRepositoryMock.createPark.and.throwError(errorMessage);

      // when
      const result = await parksController.addPark(parkData);

      // then
      expect(parkRepositoryMock.createPark).toHaveBeenCalledWith(parkData);
      expect(result.statusCode).toBe(500);
      expect(result.message).toBe(`Error creating new Energy Park with name ${parkData.name}`);
    });
  });
});
