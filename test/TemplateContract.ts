import { TemplateContract } from "../typechain-types/contracts/TemplateContract"
import { expect } from "chai"
import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"

describe("TemplateContract", function () {
    let owner: SignerWithAddress
    let user: SignerWithAddress
    let contractInstance: TemplateContract
    const value = 42

    before(async () => {
        [owner, user] = await ethers.getSigners()
        const TemplateFactory = await ethers.getContractFactory("TemplateContract")
        contractInstance = await TemplateFactory.deploy()
    })

    it("should return name of contract", async () => {
        expect(await contractInstance.name()).to.equal("TemplateContract")
    })

    it("should return version of contract", async () => {
        expect(await contractInstance.version()).to.equal("1.0.0")
    })

    it("should increment count", async () => {
        const initialCounter = await contractInstance.counter()
        await contractInstance.increment()
        expect(await contractInstance.counter()).to.equal(initialCounter + 1n)
    })

    it("should decrement count", async () => {
        const initialCounter = await contractInstance.counter()
        await contractInstance.decrement()
        expect(await contractInstance.counter()).to.equal(initialCounter - 1n)
    })

    it("should store num", async () => {
        await contractInstance.store(value)
        expect(await contractInstance.retrieve()).to.equal(value)
    })

    it("should return num event", async () => {
        await expect(contractInstance.store(value)).to.emit(contractInstance, "NumberStored").withArgs(value)
    })

    it("should revert if not owner", async () => {
        await expect(contractInstance.connect(user).ownerEvent()).to.be.revertedWithCustomError(
            contractInstance,
            "OwnableUnauthorizedAccount"
        )
    })

    it("should emit owner event", async () => {
        await expect(contractInstance.ownerEvent()).to.emit(contractInstance, "OnlyOwner").withArgs(owner.address)
    })
})
