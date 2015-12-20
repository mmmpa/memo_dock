class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def tag_ids
    normalized = params['tag_ids'].to_s.split(',').map(&:to_i).select { |id|
      id != 0
    }

    @stored_tag_ids ||= normalized.length == 0 ? nil : normalized
  end
end
