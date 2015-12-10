[![Build Status](https://travis-ci.org/mmmpa/memo_dock.svg)](https://travis-ci.org/mmmpa/memo_dock)
[![Coverage Status](https://coveralls.io/repos/mmmpa/memo_dock/badge.svg?branch=master&service=github)](https://coveralls.io/github/mmmpa/memo_dock?branch=master)
[![Code Climate](https://codeclimate.com/github/mmmpa/memo_dock/badges/gpa.svg)](https://codeclimate.com/github/mmmpa/memo_dock)

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
