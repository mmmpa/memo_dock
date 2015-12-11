module.exports = class DummyContext
  @header = {}
  @struck = {}
  @params = null
  @emit: (params...)->
    @params = params
  @strikeApi: (linker)->
    new Promise((resolve, reject)=>
      resolve(
        header: @header
        body: @struck
      )
    )
