class MemoWriterIndex < Memo
  def as_json(options={})
    options.merge!(
      only: [:id, :title, :public],
      methods: [:tag_list]
    )
    super
  end
end