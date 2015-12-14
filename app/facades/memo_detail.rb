class MemoDetail < Memo
  def as_json(options={})
    options.merge!(
      methods: [:tags]
    )
    super
  end
end