'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (query, paginate) {
  var filters = {
    $sort: convertSort(query.$sort),
    $limit: getLimit(parse(query.$limit), paginate),
    $skip: parse(query.$skip),
    $select: query.$select,
    $populate: query.$populate,
    $groupBy: query.$groupBy,
    $max: query.$max,
    $min: query.$min,
    $sum: query.$sum
  };

  return { filters: filters, query: _feathersCommons._.omit.apply(_feathersCommons._, [query].concat(PROPERTIES)) };
};

var _feathersCommons = require('feathers-commons');

var PROPERTIES = ['$sort', '$limit', '$skip', '$select', '$populate', '$groupBy', '$max', '$sum', '$min'];

function parse(number) {
  if (typeof number !== 'undefined') {
    return Math.abs(parseInt(number, 10));
  }
}

function getLimit(limit, paginate) {
  if (paginate && paginate.default) {
    var lower = typeof limit === 'number' ? limit : paginate.default;
    var upper = typeof paginate.max === 'number' ? paginate.max : Number.MAX_VALUE;

    return Math.min(lower, upper);
  }

  return limit;
}

function convertSort(sort) {
  if ((typeof sort === 'undefined' ? 'undefined' : _typeof(sort)) !== 'object') {
    return sort;
  }

  var result = {};

  Object.keys(sort).forEach(function (key) {
    return result[key] = _typeof(sort[key]) === 'object' ? sort[key] : parseInt(sort[key], 10);
  });

  return result;
}

module.exports = exports['default'];
