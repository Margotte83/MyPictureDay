const NftDay = artifacts.require("Nftday");
require('chai')
.use(require('chai-as-promised'))
.should()

contract('NftDay', (accounts) => {
    let nftday

    before(async() => {
        nftday = await NftDay.deployed()
    })

    describe('deployement', async() => {

        it('deploys successfully', async() =>{
          nftday = await NftDay.deployed()
          const address = nftday.address
          //console.log(address)
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        }) 
    })
    describe('storage', async () => {
        it('udaptes the memeHash', async () => {
            //nftday = await NftDay.deployed()
            let memeHash
            memeHash = "abc123"
            await nftday.set(memeHash)
            const result = await nftday.get()
            assert.equal(result,memeHash)

        })
    })

})