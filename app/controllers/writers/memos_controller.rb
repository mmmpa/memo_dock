module Writers
  class MemosController < ApplicationController
    layout 'writers'

    def index
      render json: {}
    end
  end
end
