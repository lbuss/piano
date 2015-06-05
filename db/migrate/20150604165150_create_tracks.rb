class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :name, null: false
      t.json :play_hash
      t.json :stop_hash
      t.json :notes
      t.timestamps null: false
    end
  end
end
