module Writers
  class SessionsController < ApplicationController
    layout 'writers'

    rescue_from ActionController::ParameterMissing, with: -> { redirect_to log_in_path }

    def new
      @session = WriterSession.new
    end

    def create
      WriterSession.create!(session_params)
      redirect_to memos_url
    rescue Authlogic::Session::Existence::SessionInvalidError => e
      @session = e.record
      render :new
    end

    def destroy
      WriterSession.find.destroy
      redirect_to root_url
    end

    private

    def session_params
      params.require(:writer_session).permit(:email, :password)
    end
  end
end

