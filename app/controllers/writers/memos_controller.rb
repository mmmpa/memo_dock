module Writers
  PAGE = 1
  PAR = 20

  class MemosController < ApplicationController
    layout 'writers'

    rescue_from ActiveRecord::RecordNotFound, with: -> { render nothing: true, status: 404 }

    def create
      Memo.create!(memo_params)
      render nothing: true, status: 201
    rescue ActiveRecord::RecordInvalid => e
      render json: e.record.errors, status: 400
    end

    def convert
      render json: {html: Memo.convert(params[:slim])}
    rescue
      render nothing: true, status: 500
    end

    def destroy
      target_memo.destroy!
      render nothing: true, status: 204
    rescue ActiveRecord::RecordNotDestroyed
      render nothing: true, status: 500
    end

    def edit
      render json: MemoDetail.find(params[:memo_id])
    rescue ActiveRecord::RecordNotFound
      render nothing: true, status: 404
    end

    def index
      response.headers['Total-Pages'] = total_pages.to_s
      response.headers['Page'] = page.to_s
      response.headers['Par'] = par.to_s
      render json: MemoWriterIndex.page(par, page)
    end

    def update
      target_memo.update!(memo_params)
      render nothing: true, status: 204
    rescue ActiveRecord::RecordInvalid => e
      render json: e.record.errors, status: 400
    end

    private

    def target_memo
      Memo.find(params[:memo_id])
    end

    def memo_params
      params.require(:memo).permit(:title, :tag_list, :src, :public)
    end

    def page
      base = (params[:page] || PAGE).to_i

      if base < 0
        1
      elsif base > total_pages
        total_pages
      else
        base
      end
    end

    def total_pages
      @stored_total_pages ||= Memo.total_pages(par)
    end

    def par
      # 可変ではない
      PAR
    end
  end
end
