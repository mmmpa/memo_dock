Rails.application.routes.draw do

  # api

  scope :r, format: false, module: :readers do
    scope :api do
      scope :memos do
        get '', to: 'memos#index', as: :readers_memos
        get ':memo_id', to: 'memos#show', as: :readers_memo
      end

      scope :tags do
        get '', to: 'tags#index', as: :readers_tags
        get ':tag_ids', to: 'tags#index', as: :readers_tags_on
      end
    end
  end

  # 編集画面

  scope :w, format: false, module: :writers do
    scope :api do
      scope :sessions do
        get '', to: 'sessions#show', as: :api_log_in
        post '', to: 'sessions#create'
        delete '', to: 'sessions#destroy'
      end

      scope :memos, constraints: Constraint::Writer.new do
        get '', to: 'memos#index', as: :memos
        get 'new', to: 'memos#new', as: :new_memo
        post 'new', to: 'memos#create'

        get ':memo_id', to: 'memos#edit', as: :memo
        patch ':memo_id', to: 'memos#update'
        delete ':memo_id', to: 'memos#destroy'

        post 'slim', to: 'memos#convert', as: :slim
      end

      get '*path', to: ->(env) { [401, {'Content-Type' => 'text/plain'}, ['unauthorized']] }
    end

    get '', to: 'portal#portal', as: :writer_portal
    get '*path', to: 'portal#portal'
  end

  # 閲覧画面

  get '', to: 'readers/portal#portal', as: :root
  get '*path', to: 'readers/portal#portal'
end
