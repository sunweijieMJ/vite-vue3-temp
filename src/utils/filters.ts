// 引入tools下的过滤函数
import { multiply, divide, priceFilter, textTohtml, handleImage, isAllow, decimalFormat, dateFormat } from './tools';

class FunctionType extends Function {}

interface FilterType {
    [key: string]: FunctionType;
}

const filters: FilterType = {
    multiply,
    divide,
    priceFilter,
    textTohtml,
    handleImage,
    isAllow,
    decimalFormat,
    dateFormat
};

export default filters;
