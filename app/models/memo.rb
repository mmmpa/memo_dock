class Memo < ActiveRecord::Base
  has_many :memo_tags, dependent: :destroy
  has_many :tags, through: :memo_tags

  attr_accessor :tag_list

  validates :title, :src, :html,
            presence: true

  validates :public,
            inclusion: {in: [true, false]}

  after_initialize :generate_tag_list!
  before_validation :convert_slim_to_html!
  before_validation :detect_tag_from_list!

  scope :on, ->(*tag_ids) {
    joins { memo_tags }
      .where { memo_tags.tag_id.in(tag_ids) }
      .group { id }
      .having { count(id).eq(tag_ids.flatten.size) }
  }

  def convert_slim_to_html!
    if src.nil?
      self.html = nil
      return
    end

    self.html = Slim::Template.new(pretty: false) { src }.render
  end

  def detect_tag_from_list!
    registered = Set.new(tags.pluck(:name))
    newer = Set.new(Array(tag_list))

    hold = registered & newer

    # なくなっているものは削除
    memo_tags.joins { tag }.where { tag.name.in (registered - hold).to_a }.destroy_all

    # 今までなかったものは作成か登録
    (newer - hold).each do |name|
      next if name.blank?
      tag = Tag.find_or_create_by(name: name)
      tags << tag
    end
  end

  def generate_tag_list!
    self.tag_list = tags.pluck(:name)
  end
end
