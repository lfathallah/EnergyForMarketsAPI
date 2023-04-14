import MarketsController from './../controllers/MarketsController.js';
import MarketRepository from './../repository/EnergyMarketRepository.js';

describe('MarketsController', () => {
  let marketsController;

  beforeEach(() => {
    const repository = new MarketRepository();
    marketsController = new MarketsController(repository);
  });

  describe('addMarket', () => {
    it('should create a new market', async () => {
      const data = {
        type_id: '1',
        energy_reserve_min: 2,
        energy_reserve_max: 3.4
      };
      const createdMarket = {
        id: 1,
        type_id: '1',
        energy_reserve_min: 2,
        energy_reserve_max: 3.4
      };

      spyOn(marketsController.repository, 'createMarket').and.returnValue(createdMarket);

      const result = await marketsController.addMarket(data);

      expect(result.message).toBe(`The new Energy Market has been created successfully with an auto-generated ID [${createdMarket.id}]`);
      expect(result.statusCode).toBe(200);
    });

    it('should return an error message on failure', async () => {
      spyOn(marketsController.repository, 'createMarket').and.throwError();

      const result = await marketsController.addMarket({});

      expect(result.message).toContain('Error creating new Energy Market');
      expect(result.statusCode).toBe(500);
    });
  });

  describe('getAllMarketsWithOffers', () => {
    it('should return a list of markets with offers', async () => {
      // given
      const data = [{
          "id": 1,
          "type_id": 1,
          "energy_reserve_min": "10",
          "energy_reserve_max": "20",
          "offers": [
            {
              "id": 1,
              "market_id": 1,
              "price": 100,
              "energy_quantity": 500
            },
            {
              "id": 2,
              "market_id": 1,
              "price": 200,
              "energy_quantity": 500
            }
          ]
       }];

      spyOn(marketsController.repository, 'findAllWithOffers').and.returnValue(data);

      // when
      const result = await marketsController.getAllMarketsWithOffers();

      // then
      expect(result.message.length).toBeGreaterThan(0);
      expect(result.statusCode).toBe(200);
    });

    it('should return an error message on failure', async () => {
      // given
      spyOn(marketsController.repository, 'findAllWithOffers').and.throwError();

      // when
      const result = await marketsController.getAllMarketsWithOffers();

      // then
      expect(result.message).toContain('finding all Markets and their offers');
      expect(result.statusCode).toBe(500);
    });
  });
});
