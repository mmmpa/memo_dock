class CreateWriters < ActiveRecord::Migration
  def change
    create_table :writers do |t|
      t.string :email

      t.string :crypted_password
      t.string :password_salt
      t.string :reset_password_token

      t.string :persistence_token

      t.timestamps null: false
    end
  end
end
