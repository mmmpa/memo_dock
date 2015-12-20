require 'rails_helper'

RSpec.describe "Readers::Portals", type: :request do
  describe 'displaying initial view' do
    it do
      get root_path
      expect(response).to have_http_status(200)
    end
  end
end
