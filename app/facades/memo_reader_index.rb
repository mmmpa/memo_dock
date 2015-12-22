class MemoReaderIndex < Memo
  default_scope { includes { tags }.where { public == true }.order { updated_at.desc } }

  def as_json(options={})
    options.merge!(
      only: [:id, :title]
    )
    super
  end
end