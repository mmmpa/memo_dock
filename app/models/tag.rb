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

  scope :on_support, ->(*tag_ids) {
    joins { memos.outer }
      .where { memos.id.in(Memo.on(tag_ids).select { id }) }
  }

  class << self
    def on(*tag_ids)
      return self if tag_ids.empty?
      on_support(*tag_ids)
    end
  end
end
