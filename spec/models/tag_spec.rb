require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'factory worked' do
    it { expect(create(:tag, :valid)).to be_a(Tag) }
  end

  describe 'validation' do
    let(:model) { build(:tag, :valid) }

    it 'valid' do
      expect(model.valid?).to be_truthy
    end

    context 'needs any input' do
      it do
        model.name = nil
        expect(model.valid?).to be_falsey
      end
    end

    context 'needs unique value' do
      it  do
        create(:tag, :valid, name: 'aa')

        model.name = 'aa'
        expect(model.valid?).to be_falsey
      end
    end
  end

  describe 'counting and memo selecting' do
    before :all do
      @store = []
      @store.push create(:memo, :valid, title: 1, tag_list: %w(a))
      @store.push create(:memo, :valid, title: 2, tag_list: %w(a))
      @store.push create(:memo, :valid, title: 3, tag_list: %w(b))
      @store.push create(:memo, :valid, title: 4, tag_list: %w(b))
      @store.push create(:memo, :valid, title: 5, tag_list: %w(b))
      @store.push create(:memo, :valid, title: 6, tag_list: %w(c))
      @store.push create(:memo, :valid, title: 7, tag_list: %w(a b))
      @store.push create(:memo, :valid, title: 8, tag_list: %w(b c))
      @store.push create(:memo, :valid, title: 9, tag_list: %w(a b c))
    end

    after :all do
      @store.map do |memo|
        memo.tags.destroy_all
        memo.destroy
      end
    end

    context 'tags with count' do
      it do
        counts = Tag.with_used_count.order { :name }.load.select{ |tag|
          %w(a b c d).include?(tag.name)
        }.map(&:count)
        expect(counts).to eq([4, 6, 3])
      end
    end

    context 'memos on tags' do
      it do
        memos = Memo.on(Tag.where{name.in %w(a)}.pluck(:id)).load
        expect(memos.size).to eq(4)
      end

      it do
        memos = Memo.on(Tag.where{name.in %w(a b)}.pluck(:id)).load
        expect(memos.size).to eq(2)
      end

      it do
        memos = Memo.on(Tag.where{name.in %w(a b c)}.pluck(:id)).load
        expect(memos.size).to eq(1)
      end

      it do
        memos = Memo.on(Tag.where{name.in %w(b c)}.pluck(:id)).load
        expect(memos.size).to eq(2)
      end
    end
  end
end
