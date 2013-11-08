class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :imie
      t.string :nazwisko
      t.integer :wiek

      t.timestamps
    end
  end
end
