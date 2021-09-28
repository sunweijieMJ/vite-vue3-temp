// 引入tools下的过滤函数
import {
  multiply,
  divide,
  priceFilter,
  textTohtml,
  handleImage,
  isAllow,
  decimalFormat,
  dateFormat,
} from './tools';

export enum FilterKey {
  multiply = 'multiply',
  divide = 'divide',
  priceFilter = 'priceFilter',
  textTohtml = 'textTohtml',
  handleImage = 'handleImage',
  dateFormat = 'dateFormat',
  decimalFormat = 'decimalFormat',
  isAllow = 'isAllow',
}

class FunctionType extends Function {}

export type FilterType = {
  [key in FilterKey]: FunctionType;
};

const filters: FilterType = {
  multiply,
  divide,
  priceFilter,
  textTohtml,
  handleImage,
  isAllow,
  decimalFormat,
  dateFormat,
};

export default filters;
