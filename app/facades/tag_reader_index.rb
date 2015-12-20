class TagReaderIndex < Tag
  default_scope { joins { memos.inner }.where { memos.public == true }.uniq }

  def as_json(options={})
    options.merge!(
      only: [:id, :name]
    )
    super
  end
end