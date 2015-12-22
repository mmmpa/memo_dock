class MemoReader < Memo
  default_scope { where { public == true } }

  def as_json(options={})
    options.merge!(
      only: [:id, :title, :html, :updated_at],
      methods: [:tags]
    )
    super
  end
end