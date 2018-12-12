class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.text :user_id, null: false, foreign_key: true
      t.string :email, null: false, unique: true
      t.string :encrypted_password, null: false
      t.timestamps
    end
  end
end
