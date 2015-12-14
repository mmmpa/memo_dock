class MemoWriterIndex < Memo
  default_scope { includes { tags } }

  def as_json(options={})
    options.merge!(
      only: [:id, :title, :public],
      methods: [:tags]
    )
    super
  end
end