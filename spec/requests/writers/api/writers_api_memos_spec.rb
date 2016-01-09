require 'rails_helper'

RSpec.describe "Writers::Api::Memos", type: :request do
  let(:json) do
    base = JSON.parse(response.body)
    if Array === base
      base.map(&:deep_symbolize_keys)
    else
      base.deep_symbolize_keys
    end
  end

  let(:header) { response.header }

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

  describe 'creating new memo' do
    before :each do
      login
    end

    context 'with valid parameters' do
      it 'gets 201, and new memo data' do
        params = attributes_for(:memo, :valid)
        expect {
          post new_memo_path, memo: params
        }.to change(Memo, :count).by(1)
        expect(response).to have_http_status(201)
        expect(json[:title]).to eq(params[:title])
        expect(json[:src]).to eq(params[:src])
      end

      context 'with string boolean' do
        it do
          expect {
            post new_memo_path, memo: attributes_for(:memo, :valid, public: 'true')
          }.to change(Memo, :count).by(1)
          expect(Memo.last.public).to be_truthy
        end

        it do
          expect {
            post new_memo_path, memo: attributes_for(:memo, :valid, public: 'false')
          }.to change(Memo, :count).by(1)
          expect(Memo.last.public).to be_falsey
        end
      end

      context 'with string tag list' do
        it do
          expect {
            post new_memo_path, memo: attributes_for(:memo, :valid, tag_list: 'tag1, tag2')
          }.to change(Memo, :count).by(1)
          expect(Memo.last.tags.pluck(:name)).to match_array(%w(tag1 tag2))
        end
      end
    end

    context 'with invalid parameters' do
      it 'gets 400' do
        expect {
          post new_memo_path, memo: attributes_for(:memo, :valid, title: '')
        }.to change(Memo, :count).by(0)
        expect(response).to have_http_status(400)
      end
    end
  end

  describe 'updating a memo' do
    before :each do
      login
    end

    let!(:target_memo) { create(:memo, :valid) }
    let!(:id) { target_memo.id }
    let!(:title) { target_memo.title }

    context 'with valid parameters' do
      it do
        expect {
          patch memo_path(memo_id: id), memo: {title: '新しいタイトル'}
        }.to change(Memo, :count).by(0)
        expect(Memo.find(id).title).to eq('新しいタイトル')
      end
    end

    context 'with invalid parameters' do
      it 'with not exist id, gets 404' do
        expect {
          patch memo_path(memo_id: 0), memo: {title: '新しいタイトル'}
        }.to change(Memo, :count).by(0)
        expect(response).to have_http_status(404)
      end

      it 'gets 400' do
        expect {
          patch memo_path(memo_id: id), memo: {title: ''}
        }.to change(Memo, :count).by(0)
        expect(Memo.find(id).title).to eq(title)
        expect(response).to have_http_status(400)
      end
    end
  end

  describe 'deleting memo' do
    before :each do
      login
    end

    let!(:target_memo) { create(:memo, :valid) }
    let!(:id) { target_memo.id }

    context 'with valid id' do
      it do
        expect {
          delete memo_path(memo_id: id)
        }.to change(Memo, :count).by(-1)
        expect(response).to have_http_status(204)
      end
    end

    context 'with invalid id' do
      it do
        expect {
          delete memo_path(memo_id: 0)
        }.to change(Memo, :count).by(0)
        expect(response).to have_http_status(404)
      end
    end

    it 'when failed, get 500' do
      expect {
        allow_any_instance_of(Memo).to receive(:destroy!) do
          raise ActiveRecord::RecordNotDestroyed.new('')
        end
        delete memo_path(memo_id: id)
      }.to change(Memo, :count).by(0)
      expect(response).to have_http_status(500)
    end
  end

  describe 'getting memo data' do
    before :each do
      login
    end

    context 'with not exist id' do
      it 'gets 404' do
        get memo_path(memo_id: 0)
        expect(response).to have_http_status(404)
      end
    end

    context 'with exist id' do
      it 'gets data' do
        get memo_path(memo_id: Memo.last.id)
        expect(response).to have_http_status(200)
        expect(json[:title]).to eq(Memo.last.title)
        expect(json[:tags]).to be_truthy
      end
    end
  end

  describe 'convert slim' do
    before :each do
      login
    end

    it 'with valid slim' do
      post slim_path, slim: 'h1 title'
      expect(response).to have_http_status(200)
      expect(json[:html]).to include('<h1>title</h1>')
    end

    it 'with invalid slim' do
      post slim_path, slim: "-h1 a\n-div a\n\ta a\n"
      expect(response).to have_http_status(500)
    end
  end

  describe 'indexing' do
    before :each do
      login
    end

    context 'header includes meta data (values must be string)' do
      it do
        get memos_path
        expect(json.size).to eq(20)
        expect(header['Total-Pages']).to eq('3')
        expect(header['Par']).to eq('20')
        expect(header['Page']).to eq('1')
      end

      it do
        get memos_path, page: 2
        expect(json.size).to eq(20)
        expect(header['Total-Pages']).to eq('3')
        expect(header['Par']).to eq('20')
        expect(header['Page']).to eq('2')
      end
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
