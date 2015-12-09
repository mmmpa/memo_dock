require 'rails_helper'

RSpec.describe "Writers::Memos", type: :request do
  describe "GET /writers_memos" do
    it "works! (now write some real specs)" do
      get writers_memos_index_path
      expect(response).to have_http_status(200)
    end
  end
end
