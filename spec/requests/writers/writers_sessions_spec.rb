require 'rails_helper'

RSpec.describe "Writers::Portals", type: :request do
  describe "GET /writers_portals" do
    it do
      get log_in_path
      expect(response).to render_template(:new)
    end

    it 'successes login with valid params' do
      post log_in_path, writer_session: {
        email: ENV['MEMO_DOCK_EMAIL'],
        password: ENV['MEMO_DOCK_PASSWORD']
      }
      expect(response).to redirect_to(memos_path)
    end

    context 'fails login' do
      it 'with invalid password' do
        post log_in_path, writer_session: {
          email: ENV['MEMO_DOCK_EMAIL'],
          password: 'invalid'
        }
        expect(response).to render_template(:new)
      end

      it 'with invalid mail address' do
        post log_in_path, writer_session: {
          email: 'invalid@gmail.com',
          password: ENV['MEMO_DOCK_PASSWORD']
        }
        expect(response).to render_template(:new)
      end

      it 'with missing parameter' do
        post log_in_path
        expect(response).to redirect_to(log_in_path)
      end
    end
  end
end
