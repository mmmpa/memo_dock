require 'rails_helper'

RSpec.describe "Readers::Memos", type: :request do
  let(:json) do
    base = JSON.parse(response.body)
    if Array === base
      base.map(&:deep_symbolize_keys)
    else
      base.deep_symbolize_keys
    end
  end

  describe 'indexing' do
    before :all do
      @store = []
      @store.push create(:memo, :valid, public: true, tag_list: %w(t1))
      @store.push create(:memo, :valid, public: true, tag_list: %w(t1))
      @store.push create(:memo, :valid, public: true, tag_list: %w(t1))
      @store.push create(:memo, :valid, public: true, tag_list: %w(t2))
      @store.push create(:memo, :valid, public: true, tag_list: %w(t2))
      @store.push create(:memo, :valid, public: true, tag_list: %w(t2 t1))
      @store.push create(:memo, :valid, public: true, tag_list: %w(t3))
      @store.push create(:memo, :valid, public: true, tag_list: %w(t3 t2))
      @store.push create(:memo, :valid, public: true, tag_list: %w(t3 t2 t1))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t1))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t1))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t1))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t2))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t2))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t2 t1))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t3))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t3 t2))
      @store.push create(:memo, :valid, public: false, tag_list: %w(t3 t2 t1))
    end

    after :all do
      @store.each(&:destroy)
    end

    let(:t1) { Tag.find_by(name: 't1').id }
    let(:t2) { Tag.find_by(name: 't2').id }
    let(:t3) { Tag.find_by(name: 't3').id }

    it 'get all public memos' do
      get readers_memos_path
      expect(json.size).to eq(9)
    end

    context 'get tagged public memos' do
      it do
        get readers_memos_path, tag_ids: [t1].join(',')
        expect(json.size).to eq(5)
      end

      it do
        get readers_memos_path, tag_ids: [t1, t2].join(',')
        expect(json.size).to eq(2)
      end

      it do
        get readers_memos_path, tag_ids: [t1, t2, t3].join(',')
        expect(json.size).to eq(1)
      end
    end
  end

  describe 'displaying' do
    let!(:target_memo) { create(:memo, :valid) }
    let!(:id) { target_memo.id }
    let!(:title) { target_memo.title }

    let!(:not_public_memo) { create(:memo, :valid, public: false) }
    let!(:not_public_id) { not_public_memo.id }

    it 'with exist id, get memo' do
      get readers_memo_path(memo_id: id)
      expect(json[:title]).to eq(title)
    end

    it 'with not exist id, get 404' do
      get readers_memo_path(memo_id: 0)
      expect(response).to have_http_status(404)
    end

    it 'with not public id, get 404' do
      get readers_memo_path(memo_id: not_public_id)
      expect(response).to have_http_status(404)
    end
  end
end
