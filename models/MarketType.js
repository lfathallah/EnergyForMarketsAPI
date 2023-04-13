import {Model} from 'sequelize'

export default class MarketType extends Model {

  static equals(first, other) {
    return first.id === other.id;
  }
}