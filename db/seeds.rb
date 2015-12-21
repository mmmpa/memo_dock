def generate_tag_list(base_num)
  tags = base_num % 5
  (0..tags).to_a.map do |n|
    "タグ#{n + 1}"
  end
end

Writer.destroy_all
Writer.create!(email: ENV['MEMO_DOCK_EMAIL'], password: ENV['MEMO_DOCK_PASSWORD'])

if ENV['RAILS_ENV'] != 'production'
  Memo.destroy_all
  Tag.destroy_all

  (1..50).to_a.each do |n|
    Memo.create!(
      title: "タイトル#{n}",
      src: "h1 タイトル#{n}\np 本文#{n}",
      tag_list: generate_tag_list(n),
      public: ENV['RAILS_ENV'] != 'test'
    )
  end
end

