class Tag < ActiveRecord::Base
  has_many :memo_tags, dependent: :destroy
  has_many :memos, through: :memo_tags

  validates :name,
            presence: true,
            uniqueness: true

  scope :with_used_count, -> {
    joins { memos.outer }
      .select { ['tags.*', count(memos.id).as(count)] }
      .group { id }
  }

  scope :on, ->(*tag_ids) {
    joins { memos.outer }
      .where { memos.id.in(Memo.has_tag(tag_ids).select { id }) }
  }
end
