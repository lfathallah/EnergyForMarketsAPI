import {Model} from 'sequelize'

export default class Offer extends Model {

  static equals(first, other) {
    return first.id === other.id;
  }
}