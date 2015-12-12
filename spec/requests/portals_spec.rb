require 'rails_helper'

RSpec.describe "Portals", type: :request do
  describe 'writer portal' do
    it do
      get writer_portal_path
      expect(response).to have_http_status(200)
    end
  end
end
