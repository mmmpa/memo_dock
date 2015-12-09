require 'rails_helper'

RSpec.describe MemoTag, type: :model do
  describe 'factory worked' do
    it { expect(create(:memo_tag, :valid)).to be_a(MemoTag) }
  end

  describe 'validation' do
    let(:model) { build(:memo_tag, :valid) }

    it 'valid' do
      expect(model.valid?).to be_truthy
    end

    context 'needs any input' do
      it do
        model.tag = nil
        expect(model.valid?).to be_falsey
      end

      it do
        model.memo = nil
        expect(model.valid?).to be_falsey
      end
    end

    context 'needs unique value' do
      let(:memo){create(:memo, :valid)}
      let(:tag){create(:tag, :valid)}

      it  do
        create(:memo_tag, memo: memo, tag: tag)

        model.memo = memo
        model.tag = tag
        expect(model.valid?).to be_falsey
      end
    end
  end
end
