class CreateMemoTags < ActiveRecord::Migration
  def change
    create_table :memo_tags do |t|
    end

    add_reference :memo_tags, :memo, index: true
    add_reference :memo_tags, :tag, index: true
    add_index :memo_tags, [:memo_id, :tag_id], unique: true
  end
end
