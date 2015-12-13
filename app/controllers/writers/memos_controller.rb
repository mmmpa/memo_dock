module Writers
  PAGE = 1
  PAR = 20

  class MemosController < ApplicationController
    layout 'writers'

    def index
      render json: Memo.page(par, page)
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
