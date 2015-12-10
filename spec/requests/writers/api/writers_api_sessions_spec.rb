require 'rails_helper'

RSpec.describe "Writers::Api::Sessions", type: :request do
  describe 'login' do
    it 'successes login with valid params' do
      post api_log_in_path, writer_session: {
        email: ENV['MEMO_DOCK_EMAIL'],
        password: ENV['MEMO_DOCK_PASSWORD']
      }
      expect(response).to have_http_status(201)
      p cookies['writer_credentials']
    end

    context 'fails login' do
      it 'with invalid password' do
        post api_log_in_path, writer_session: {
          email: ENV['MEMO_DOCK_EMAIL'],
          password: 'invalid'
        }
        expect(response).to have_http_status(401)
      end

      it 'with invalid mail address' do
        post api_log_in_path, writer_session: {
          email: 'invalid@gmail.com',
          password: ENV['MEMO_DOCK_PASSWORD']
        }
        expect(response).to have_http_status(401)
      end

      it 'with missing parameter' do
        post api_log_in_path
        expect(response).to have_http_status(401)
      end
    end

  end
end
