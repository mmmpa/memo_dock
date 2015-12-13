class MemoDetail < Memo
  def as_json(options={})
    options.merge!(
             methods: [:tag_list]
    )
    super
  end
end