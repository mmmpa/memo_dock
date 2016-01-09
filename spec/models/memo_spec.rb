require 'rails_helper'

RSpec.describe Memo, type: :model do
  describe 'factory worked' do
    it { expect(create(:memo, :valid)).to be_a(Memo) }
  end

  describe 'meta data' do
    it do
      page = Memo.total_pages(19)
      expect(page).to eq(3)
    end

    it do
      page = Memo.on(Tag.first.id).total_pages(19)
      expect(page).to eq(3)
    end
  end

  describe 'converting slim to html' do
    let(:model) { build(:memo, :valid) }

    it do
      model.src = 'h1 test'
      model.valid?
      expect(model.html).to have_tag('h1', content: 'test')
    end

    it do
      model.src = nil
      model.valid?
      expect(model.html).to be_nil
    end
  end

  describe 'tagging' do
    let(:model) do
      build(:memo, :valid)
    end

    context 'adds new tags' do
      before do
        model.tag_list = %w(a b c)
        model.save
      end

      it do
        expect(model.tags.size).to eq(3)
      end

      it do
        expect(model.tags.pluck(:name)).to match_array(%w(a b c))
      end
    end

    context 'adds exist tags' do
      before do
        create(:memo, :valid, tag_list: %w(a b c))

        model.tag_list = %w(a b c)
        model.save
      end

      it do
        expect(model.tags.size).to eq(3)
      end

      it do
        expect(model.tags.pluck(:name)).to match_array(%w(a b c))
      end
    end

    context 'adds exist tags and new tag' do
      before do
        create(:memo, :valid, tag_list: %w(a b c))

        model.tag_list = %w(a b c d e)
        model.save
      end

      it do
        expect(model.tags.size).to eq(5)
      end

      it do
        expect(model.tags.pluck(:name)).to match_array(%w(a b c d e))
      end
    end

    context 'update tags(remove)' do
      before do
        model.tag_list = %w(a b c d e)
        model.save

        model.tag_list = %w(d e)
        model.save

        model.tags(true)
      end

      it do
        expect(model.tags.size).to eq(2)
      end

      it do
        expect(model.tags.pluck(:name)).to match_array(%w(d e))
      end
    end

    context 'update tags(add)' do
      before do
        model.tag_list = %w(a b c d e)
        model.save

        model.tag_list = %w(a b c d e f g)
        model.save

        model.tags(true)
      end

      it do
        expect(model.tags.size).to eq(7)
      end

      it do
        expect(model.tags.pluck(:name)).to match_array(%w(a b c d e f g))
      end
    end

    context 'not delete Tag when remove tag' do
      let(:old_model) do
        create(:memo, :valid, tag_list: %w(a b c))
      end

      before do
        model.tag_list = %w(a b c d e)
        model.save

        model.tag_list = ''
        model.save

        model.tags(true)
      end

      it do
        expect(model.tags.size).to eq(0)
      end

      it do
        expect(old_model.tags.size).to eq(3)
      end
    end
  end

  describe 'validation' do
    let(:model) { build(:memo, :valid) }

    it 'valid' do
      expect(model.valid?).to be_truthy
    end

    context 'need valid slim' do
      it do
        model.src = ":h1 test"
        expect(model.valid?).to be_falsey
      end
    end

    context 'needs any input' do
      it do
        model.title = nil
        expect(model.valid?).to be_falsey
      end

      it do
        model.src = nil
        expect(model.valid?).to be_falsey
      end

      it 'html is inserted automatically' do
        model.html = nil
        expect(model.valid?).to be_truthy
      end

      it do
        model.public = nil
        expect(model.valid?).to be_falsey
      end
    end

    context 'needs boolean' do
      it 'with 0' do
        model.public = 0
        expect(model.public).to be_falsey
      end

      it 'with 1' do
        model.public = 1
        expect(model.public).to be_truthy
      end

      it 'with true' do
        model.public = true
        expect(model.valid?).to be_truthy
      end

      it 'with false' do
        model.public = false
        expect(model.valid?).to be_truthy
      end

      it 'with "true"' do
        model.public = 'true'
        expect(model.public).to be_truthy
      end

      it 'with "false""' do
        model.public = 'false'
        expect(model.public).to be_falsey
      end

      context 'with other (default: false)' do
        it do
          model.public = :a
          expect(model.public).to be_falsey
        end

        it do
          model.public = 'a'
          expect(model.public).to be_falsey
        end
      end
    end
  end
end
