import {Model} from 'sequelize'

export default class TimeBlock extends Model {

  static equals(first, other) {
    return first.id === other.id;
  }
}