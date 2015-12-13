def login
  activate_authlogic
  @writer = Writer.first
  WriterSession.create!(@writer)
  cookies['writer_credentials'] = [@writer.persistence_token, @writer.id].join('::')
end