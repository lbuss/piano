class Api::TracksController < ApplicationController
  def index
    @track_list = Track.all
    render json: @track_list
  end

  def create
    @track = Track.new(track_params)
    @track[:play_hash] = params[:track][:play_hash]
    @track[:stop_hash] = params[:track][:stop_hash]
    @track[:notes] = params[:track][:notes]
    if @track.save!
      @track_list = Track.all.select("id, name")
      render json: @track_list
    else
      render json: {errors: @track.errors.full_messages}
    end
  end

  def show
    @track = Track.find(params[:id])
    render json: @track.as_json
  end

  def update
    @track = Track.find(params[:id])
    if @track.update_attributes(track_params)
      render json: @track
    else
      render json: {errors: @track.errors.full_messages}
    end
  end

  def destroy
    @track = Track.find(params[:id])
    if @track.destroy!
      render json: {}
    else
      render json: {errors: @track.errors.full_messages}
    end

  end

  private
  def track_params
    params.require(:track).permit(:name);
  end
end
