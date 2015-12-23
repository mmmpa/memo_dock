module Readers
  class PortalController < ApplicationController
    layout 'readers'

    def portal
      @title = write_title
      @memos = Memo.select { [:id, :title] }.all
      @memo = target_memo(ENV['MEMO_DOCK_PORTAL_MEMO'] || Memo.first.id)
    end

    def show_memo
      @memo = target_memo(params[:memo_id])
      @title = write_title(@memo.title)
      render :portal
    end

    private

    def target_memo(id)
      Memo.find(id)
    rescue
      Memo.new
    end

    def write_title(title = nil)
      return ENV['MEMO_DOCK_TITLE'] if title.present?
      [title, ENV['MEMO_DOCK_TITLE']].join(' : ')
    end
  end
end
