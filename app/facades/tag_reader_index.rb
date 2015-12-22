class TagReaderIndex < Tag
  default_scope { joins { memos.inner }.where { memos.public == true }.order { name }.uniq }

  def as_json(options={})
    options.merge!(
      only: [:id, :name]
    )
    super
  end
end