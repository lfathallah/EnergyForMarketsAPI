import {Model} from 'sequelize'

export default class EnergyMarket extends Model {
  static equals(first, other) {
    return first.id === other.id;
  }
}