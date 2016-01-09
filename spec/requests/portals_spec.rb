require 'rails_helper'

RSpec.describe "Portals", type: :request do
  describe 'writer portal' do
    it do
      get writer_portal_path
      expect(response).to have_http_status(200)
    end

    it do
      memo = Memo.first

      get show_memo_path(memo_id: memo.id)
      expect(response).to have_http_status(200)
      expect(response.body).to include(memo.title)
      expect(response.body).to include(memo.html)
    end

    it do
      get show_memo_path(memo_id: 0)
      expect(response).to have_http_status(200)
    end
  end
end
