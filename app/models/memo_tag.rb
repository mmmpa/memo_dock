class MemoTag < ActiveRecord::Base
  belongs_to :memo, inverse_of: :memo_tags
  belongs_to :tag, inverse_of: :memo_tags

  validates :memo, :tag,
            presence: true

  validates :memo,
            uniqueness: {
              scope: :tag
            }
end
