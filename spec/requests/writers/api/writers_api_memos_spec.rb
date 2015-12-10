require 'rails_helper'

RSpec.describe "Writers::Api::Memos", type: :request do
  describe "GET /writers_api_memos" do
    describe 'needs login' do
      it 'gets 401 when not logged in' do
        get memos_path
        expect(response).to have_http_status(401)
      end

      it 'gets 200 when logged in'do
        post api_log_in_path, writer_session: {
          email: ENV['MEMO_DOCK_EMAIL'],
          password: ENV['MEMO_DOCK_PASSWORD']
        }

        get memos_path
        expect(response).to have_http_status(401)
      end
    end
  end
end
