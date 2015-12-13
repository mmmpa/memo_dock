require 'rails_helper'

RSpec.describe "Writers::Api::Memos", type: :request do
  let(:json) { JSON.parse(response.body).map(&:deep_symbolize_keys) }

  describe 'needs login' do
    it 'gets 401 when not logged in' do
      get memos_path
      expect(response).to have_http_status(401)
    end

    it 'gets 200 when logged in' do
      login

      get memos_path
      expect(response).to have_http_status(200)
    end
  end

  describe 'indexing' do
    before :each do
      login
    end

    context 'with no parameters' do
      it 'gets last 20 memos at once' do
        get memos_path
        expect(json.size).to eq(20)
        expect(json.first[:title]).to eq('タイトル50')
      end
    end

    context 'with page parameter' do
      it 'gets 50-31 memos' do
        get memos_path, page: 1
        expect(json.size).to eq(20)
        expect(json.first[:title]).to eq('タイトル50')
      end

      it 'gets 30-11 memos' do
        get memos_path, page: 2
        expect(json.size).to eq(20)
        expect(json.first[:title]).to eq('タイトル30')
      end

      it 'gets 10-1 memos' do
        get memos_path, page: 3
        expect(json.size).to eq(10)
        expect(json.first[:title]).to eq('タイトル10')
      end
    end

    context 'with page parameter that is out of range' do
      it 'under, gets first 20 memos' do
        get memos_path, page: 0
        expect(json.size).to eq(20)
        expect(json.first[:title]).to eq('タイトル50')
      end

      it 'over, gets last rest memos' do
        get memos_path, page: 4
        expect(json.size).to eq(10)
        expect(json.first[:title]).to eq('タイトル10')
      end
    end
  end
end
