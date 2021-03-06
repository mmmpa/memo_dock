# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151209062506) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "memo_tags", force: :cascade do |t|
    t.integer "memo_id"
    t.integer "tag_id"
  end

  add_index "memo_tags", ["memo_id", "tag_id"], name: "index_memo_tags_on_memo_id_and_tag_id", unique: true, using: :btree
  add_index "memo_tags", ["memo_id"], name: "index_memo_tags_on_memo_id", using: :btree
  add_index "memo_tags", ["tag_id"], name: "index_memo_tags_on_tag_id", using: :btree

  create_table "memos", force: :cascade do |t|
    t.string   "title",                      null: false
    t.text     "src",                        null: false
    t.text     "html",                       null: false
    t.boolean  "public",     default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "writers", force: :cascade do |t|
    t.string   "email"
    t.string   "crypted_password"
    t.string   "password_salt"
    t.string   "reset_password_token"
    t.string   "persistence_token"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

end
