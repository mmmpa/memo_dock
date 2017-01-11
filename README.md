[![Build Status](https://travis-ci.org/mmmpa/memo_dock.svg)](https://travis-ci.org/mmmpa/memo_dock)
[![Coverage Status](https://coveralls.io/repos/mmmpa/memo_dock/badge.svg?branch=master&service=github)](https://coveralls.io/github/mmmpa/memo_dock?branch=master)
[![Code Climate](https://codeclimate.com/github/mmmpa/memo_dock/badges/gpa.svg)](https://codeclimate.com/github/mmmpa/memo_dock)

# MEMO DOCK

# TODO

- 最初の1ページがないとなにがあってもアクセスできないので対処。
- codeclimate 対応

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

# 設計メモ

特にget系の動作をする場合は内部から直接dispatchするのではなくて、pushStateでurlを変更後に、routerに登録した関数からdispatchする。

そのための関数はcontainerから注入されるため、storeの存在を下位コンポーネントが知らずにいられるのと同じように、routerの存在もしらずにいられるようにする。

post系はcontainerから注入された関数経由でdispatchする普通のアクセスでOK。

action名はとりあえず動詞で、reducerはそのままショートハンドで使えるように動詞。
