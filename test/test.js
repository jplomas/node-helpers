var QrlNode  = require('../src/index.js')

var chaiAsPromised = require("chai-as-promised")
var chai = require("chai")
chai.use(chaiAsPromised)
var expect = chai.expect
var assert = chai.assert

var ip = 'mainnet-1.automated.theqrl.org'
var port = '19009'
var mainnet = new QrlNode(ip, port)

describe('#mainnet', async function() {
  // *may* need to increase the time between tests if network is slow
  // beforeEach(done => setTimeout(done, 500))
  this.timeout(20000) // 20 second timeout on tests
  it(`.version should report same version as in npm package.json file (=${process.env.npm_package_version})`, function() {
    var result = mainnet.version
    expect(result).to.equal(process.env.npm_package_version)
  })

  it(`.ipAddress should report same as invoked in setup (${ip})`, function() {
    var result = mainnet.ipAddress
    expect(ip).to.equal(result)
  }) 

  it(`.port should report same as invoked in setup (${port})`, function() {
    var result = mainnet.port
    expect(port).to.equal(result)
  }) 

  it('mainnet node should report SYNCED', async function() {
    async function node() {
      return new Promise(async (resolve, reject) => {
        let id = null
        const client = await mainnet.connect()
        client.GetStats({}, async (error, response) => {
          if (error) {
            throw new Error(error)
          }
          resolve(response.node_info.state)
        })
      })
    }
    await expect(node()).to.eventually.equal('SYNCED')
  })

  it('expect GetOTS to function if called from existing client connection', async function() {
    async function node() {
      return new Promise(async (resolve, reject) => {
        const request = {
          address: Buffer.from('010500bc576efa69fd6cbc854f2224f149f0b0a4d18fcb30c1feab64781245f4f27a61874227f3', 'hex'),
        }
        const client = await mainnet.client
        client.GetOTS(request, (error, response) => {
          if (error) {
            throw new Error(error)
          }
          resolve(response.unused_ots_index_found)
        })
      })
    }
    await expect(node()).to.eventually.equal(true)
  })

  it('a second attempted connection should have its Promise rejected', async function() {
    async function node() {
      return await mainnet.connect()
    }
    await expect(node()).to.eventually.be.rejected
  })

  it('an invalid node ip/port should have its Promise rejected', async function() {
    async function node() {
      ip = 'fake.theqrl.org'
      port = '19009'
      const badhelpers = new QrlNode(ip, port)
      const badclient = await badhelpers.connect()
      return badclient
    }
    await expect(node()).to.eventually.be.rejected
  })

  it('testnet node should have \'The Random Genesis\' as its network_id', async function() {
    async function node() {
      return new Promise(async (resolve, reject) => {
        ip = 'testnet-1.automated.theqrl.org'
        port = '19009'
        let id = null
        var testnet = new QrlNode(ip, port)
        const client = await testnet.connect()
        client.GetStats({}, async (error, response) => {
          if (error) {
            throw new Error(error)
          }
          resolve(response.node_info.network_id)
        })
      })
    }
    await expect(node()).to.eventually.equal('The Random Genesis')
  })

})
