'use strict'

const chai = require('chai')
const deepFreeze = require('freezly').default
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.use(sinonChai)

const logger = require('../../lib/logger')
const CiBase = require('../../lib/ci/base')
const Jenkins = require('../../lib/ci/jenkins')
const testUtils = require('./utils')
const ensureCiBaseMethodIsUsed = testUtils.ensureCiBaseMethodIsUsed

const CONFIG = deepFreeze({
  id: 'config'
})

const VCS = deepFreeze({
  id: 'vcs'
})

describe('CI / Jenkins', function () {
  let jenkins, sandbox
  let ctx = {}

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    // get rid of all logging messages in the tests (and let us test for them if we want)
    sandbox.stub(logger, 'log')
    jenkins = new Jenkins(CONFIG, VCS)

    ctx.ci = jenkins
    ctx.sandbox = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should save the config', function () {
    expect(jenkins.config).to.deep.equal(CONFIG)
  })

  it('should save the vcs', function () {
    expect(jenkins.vcs).to.deep.equal(VCS)
  })

  it('should extend CiBase', function () {
    expect(jenkins).to.be.an.instanceof(CiBase)
  })

  ensureCiBaseMethodIsUsed(ctx, 'add')
  ensureCiBaseMethodIsUsed(ctx, 'commit')
  ensureCiBaseMethodIsUsed(ctx, 'push')
  ensureCiBaseMethodIsUsed(ctx, 'setupGitEnv')
})
