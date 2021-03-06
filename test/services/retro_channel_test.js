import { expect } from "chai"

import { Socket, Channel } from "phoenix"

import RetroChannel from "../../web/static/js/services/retro_channel"

describe("RetroChannel", () => {
  describe(".configure", () => {
    let result

    it("returns an instance of PhoenixChannel", () => {
      result = RetroChannel.configure({ userToken: "38ddm2" })
      expect(result.constructor).to.equal(Channel)
    })

    describe("the returned Phoenix channel", () => {
      it("is closed", () => {
        result = RetroChannel.configure({ userToken: "802db2" })
        expect(result.state).to.equal("closed")
      })

      it("has a topic attribute identifying the retro with the supplied UUID", () => {
        result = RetroChannel.configure({ userToken: "3727bj3", retroUUID: "blurg" })
        expect(result.topic).to.equal("retro:blurg")
      })

      it("has a socket attribute referencing a phoenix socket", () => {
        result = RetroChannel.configure({ userToken: "86md2p", retroUUID: "blurg" })
        expect(result.socket.constructor).to.equal(Socket)
      })

      describe("the socket", () => {
        it("contains a params object containing the supplied userToken", () => {
          result = RetroChannel.configure({ userToken: "bl37urg", retroUUID: "blurg" })
          const socketParams = result.socket.params
          expect(socketParams.userToken).to.equal("bl37urg")
        })
      })
    })
  })
})

