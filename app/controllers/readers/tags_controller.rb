module Readers
  class TagsController < ApplicationController
    def index
      render json: TagReaderIndex.on(*tag_ids).all, status: 200
    end
  end
end
