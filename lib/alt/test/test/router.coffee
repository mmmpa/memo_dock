config = require '../helper'
assert = require 'power-assert'
Router = (require config.path('lib', 'router')).default

describe 'Film Router', ->
  describe 'Normalization', ->
    before ->
      @router = new Router()

    it 'normal', ->
      assert.deepEqual @router.normalize('/user'), ['/user', '']

    it 'with tail slash', ->
      assert.deepEqual @router.normalize('/user/'), ['/user', '']

    it 'with place holder', ->
      assert.deepEqual @router.normalize('/user/:id'), ['/user/:', 'id']

    it 'with name after place holder', ->
      assert.deepEqual @router.normalize('/user/:id/address'), ['/user/:/address', 'id']

    it 'with name and tail slash after place holder', ->
      assert.deepEqual @router.normalize('/user/:id/address/'), ['/user/:/address', 'id']

    it 'with multiple place holder', ->
      assert.deepEqual @router.normalize('/user/:id/address/:address_id'), ['/user/:/address/:', 'id:address_id']

  describe 'Registration', ->
    it 'when same name added', ->
      router = new Router()
      router.add('/user', ()-> 'test')
      assert.equal router.add('/user', ()-> 'test'), false

    it 'root', ->
      router = new Router()
      router.add('/', (params)-> 'root')
      assert.equal router.execute('/'), 'root'

    it 'normal', ->
      router = new Router()
      router.add('/user', (params)-> 'test')
      assert.equal router.execute('/user'), 'test'

    it 'with placeholder', ->
      router = new Router()
      router.add('/user/:id', (params)-> "id #{params.id}")
      assert.deepEqual router.execute('/user/1'), 'id 1'

    it 'with name after placeholder', ->
      router = new Router()
      router.add('/user/:id/address', (params)-> "address #{params.id}")
      assert.deepEqual router.execute('/user/1/address'), 'address 1'

    it 'with double placeholder', ->
      router = new Router()
      router.add('/user/:id/address/:address_id', (params)-> "address #{params.id} #{params.address_id}")
      assert.deepEqual router.execute('/user/1/address/2'), 'address 1 2'

    it 'with multiple route', ->
      router = new Router()
      router.add('/user', (params)-> 'test')
      router.add('/user/:id/address', (params)-> "address #{params.id}")
      router.add('/user/:id/address/:address_id', (params)-> "address #{params.id} #{params.address_id}")

      assert.deepEqual router.execute('/user/1/address/2'), 'address 1 2'
      assert.equal router.execute('/user'), 'test'
      assert.deepEqual router.execute('/user/21/address'), 'address 21'
