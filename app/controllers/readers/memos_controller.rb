module Readers
  class MemosController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: -> { render nothing: true, status: 404 }

    def index
      p tag_ids
      render json: MemoReaderIndex.on(*tag_ids).all
    end

    def show
      render json: target_memo, status: 200
    end

    private

    def target_memo
      MemoReader.find(params[:memo_id])
    end
  end
end
