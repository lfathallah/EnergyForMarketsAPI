import OffersController from './../controllers/OffersController.js';
import OfferRepository from './../repository/OfferRepository.js';

describe('OffersController', () => {
  let offersController;
  let repository;

  beforeEach(() => {
    repository = new OfferRepository();
    offersController = new OffersController(repository);
  });

  describe('addOffer', () => {
    it('should create a new offer', async () => {
      // given
      let offerData = {
        energy_quantity: 3,
        market_id: 1,
        price: 12
      };
      let offer = {
        id: 1,
        energy_quantity: 3,
        market_id: 1,
        price: 12
      };

      spyOn(offersController.repository, 'createOffer').and.returnValue(offer);

      // when
      const result = await offersController.addOffer(offerData);

      // then
      expect(result.message).toContain(`The new Offer has been created successfully with an auto-generated ID [${offer.id}]`);
      expect(result.statusCode).toBe(200);
    });

    it('should return an error message on failure', async () => {
      // given
      spyOn(offersController.repository, 'createOffer').and.throwError();

      // when
      const result = await offersController.addOffer({});

      // then
      expect(result.statusCode).toBe(500);
      expect(result.message).toBe(`Error creating new Energy Offer`);
    });
  });
});
