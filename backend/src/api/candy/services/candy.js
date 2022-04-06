'use strict';

/**
 * candy service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::candy.candy');
