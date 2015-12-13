module Writers
  PAGE = 1
  PAR = 20

  class MemosController < ApplicationController
    layout 'writers'

    def index
      response.headers['Total-Pages'] = total_pages.to_s
      response.headers['Page'] = page.to_s
      response.headers['Par'] = par.to_s
      render json: MemoWriterIndex.page(par, page)
    end

    def edit
      render json: MemoDetail.find(params[:memo_id])
    rescue ActiveRecord::RecordNotFound
      render nothing: true, status: 404
    end

    private

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
