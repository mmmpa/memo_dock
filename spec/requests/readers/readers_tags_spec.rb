require 'rails_helper'

RSpec.describe "Readers::Tags", type: :request do
  let(:json) do
    base = JSON.parse(response.body)
    if Array === base
      base.map(&:deep_symbolize_keys)
    else
      base.deep_symbolize_keys
    end
  end

  before :all do
    @store = []
    @store.push create(:memo, :valid, public: true, tag_list: %w(t1))
    @store.push create(:memo, :valid, public: true, tag_list: %w(t2))
    @store.push create(:memo, :valid, public: true, tag_list: %w(t2 t1))
    @store.push create(:memo, :valid, public: true, tag_list: %w(t3))
    @store.push create(:memo, :valid, public: true, tag_list: %w(t3 t2))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t4))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t5))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t6))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t2))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t2))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t2 t1))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t3))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t3 t2))
    @store.push create(:memo, :valid, public: false, tag_list: %w(t3 t2 t1))
  end

  after :all do
    @store.each(&:destroy)
    Tag.where { name.in(%w(t1 t2 t3 t4 t5)) }.destroy_all
  end

  let(:t1) { Tag.find_by(name: 't1').id }
  let(:t2) { Tag.find_by(name: 't2').id }
  let(:t3) { Tag.find_by(name: 't3').id }

  describe 'indexing' do
    it 'all used tags' do
      get readers_tags_path
      expect(json.size).to eq(3)
    end

    it 'all used tags that are tagged' do
      get readers_tags_path, tag_ids: [t2, t3].join(',')
      pp json
      expect(json.size).to eq(2)
    end
  end
end
