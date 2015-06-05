class Track < ActiveRecord::Base
  # validates :play_hash, :stop_hash, :notes, presence: true

  def as_json(options = {})
    {
      play_hash: self[:play_hash],
      stop_hash: self[:stop_hash],
      notes: self[:notes],
      name: self.name,
      id: self.id
    }
  end
end
