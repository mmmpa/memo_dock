class MemoReader < Memo
  default_scope { where { public == true } }

  def as_json(options={})
    options.merge!(
      only: [:id, :title, :html],
      methods: [:tags]
    )
    super.merge!(updated_at: updated_at.strftime('%Y/%m/%d %H:%M'))
  end
end