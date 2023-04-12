import {Model} from 'sequelize'

export default class EnergyType extends Model {

  static equals(first, other) {
    return first.id === other.id;
  }
}