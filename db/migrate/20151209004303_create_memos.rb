class CreateMemos < ActiveRecord::Migration
  def change
    create_table :memos do |t|
      t.string :title, null: false
      t.text :src, null: false
      t.text :html, null: false
      t.boolean :public, null: false, default: false
      t.timestamps null: false
    end
  end
end
