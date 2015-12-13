class MemoWriterIndex < Memo
  default_scope { includes { [:tags, :memo_tags] } }

  def as_json(options={})
    options.merge!(
      only: [:id, :title, :public],
      methods: [:tags]
    )
    super
  end
end