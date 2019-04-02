'use strict'

require('../typedefs')

const CiBase = require('./base')

/**
 * CI interface for Jenkins Server
 *
 * @class
 * @implements {Ci}
 */
class Jenkins extends CiBase {}

module.exports = Jenkins
