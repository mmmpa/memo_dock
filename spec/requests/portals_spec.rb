require 'rails_helper'

RSpec.describe "Portals", type: :request do
  describe "GET /portals" do
    it "works! (now write some real specs)" do
      get portals_path
      expect(response).to have_http_status(200)
    end
  end
end
