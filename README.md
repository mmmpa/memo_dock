# MEMO DOCK

# Installation

## 環境変数

|変数名|用途|
|:---|:---|
|ENV['MEMO_DOCK_EMAIL']|編集画面ログイン用のメールアドレス|
|ENV['MEMO_DOCK_PASSWORD']|編集画面ログイン用のパスワード|

## Do

```
RAILS_ENV=production rake db:create
RAILS_ENV=production rake db:migrate
RAILS_ENV=production rake db:seed
```