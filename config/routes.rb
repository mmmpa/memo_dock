Rails.application.routes.draw do

  # api

  namespace :api do
    get 'tags/:tag_ids', to: 'tags#index'

    get 'tags/:tag_ids/memos', to: 'memos#index'
    get 'memos/:memo_id', to: 'memos#show'
  end

  # 編集画面

  scope :w, module: :writers  do
    get '', to: 'sessions#new', as: :log_in
    post '', to: 'sessions#create'
    delete '', to: 'sessions#destroy', as: :log_out

    scope :memo do
      get '', to: 'memos#index', as: :memos
      get 'new', to: 'memos#new', as: :new_memo
      post 'new', to: 'memos#create'

      get ':memo_id', to: 'memos#edit', as: :memo
      patch ':memo_id', to: 'memos#update'
      delete ':memo_id', to: 'memos#destroy'

      post 'slim', to:  'memos#convert', as: :slim
    end
  end

  # 閲覧画面

  get '', to: 'portal#portal', as: :root
  get '*path', to: 'portal#portal'
end
