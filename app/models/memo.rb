class Memo < ActiveRecord::Base
  has_many :memo_tags, dependent: :destroy
  has_many :tags, through: :memo_tags

  attr_accessor :tag_list

  validates :title, :src, :html,
            presence: true

  validates :public,
            inclusion: {in: [true, false]}

  before_validation :convert_slim_to_html!
  before_validation :detect_tag_from_list!

  scope :on_support, ->(*tag_ids) {
    joins { memo_tags }
      .where { memo_tags.tag_id.in(tag_ids) }
      .group { id }
      .having { count(id).eq(tag_ids.flatten.size) }
  }

  scope :page, ->(page_par, page_num) { order { created_at.desc }.limit(page_par).offset(page_par * (page_num - 1)) }

  class << self
    def on(*tag_ids)
      return self if tag_ids.empty?
      on_support(*tag_ids)
    end

    def convert(slim)
      Slim::Template.new(pretty: false) { slim }.render
    end

    def total_pages(par)
      base = count
      if Hash === base
        (count.keys.length.to_f / par).ceil
      else
        (base.to_f / par).ceil
      end
    end
  end

  def convert_slim_to_html!
    if src.nil?
      self.html = nil
      return
    end

    self.html = Memo.convert(src)
  end

  def normalized_tag_list
    Array(temp_tag_list)
      .flatten
      .join(',')
      .gsub(/,[^\S]+/, ',')
      .tr('　０-９Ａ-Ｚａ-ｚ－', ' 0-9A-Za-z-')
      .split(',')
  end

  def detect_tag_from_list!
    registered = Set.new(tags.pluck(:name))
    newer = Set.new(normalized_tag_list)

    hold = registered & newer

    # なくなっているものは削除
    memo_tags.joins { tag }.where { tag.name.in (registered - hold).to_a }.destroy_all

    # 今までなかったものは作成か登録
    (newer - hold).each do |name|
      next if name.blank?
      tag = Tag.find_or_create_by(name: name)
      tags << tag
    end

    self.tag_list = nil
  end

  def temp_tag_list
    self.tag_list || tags.pluck(:name)
  end
end
