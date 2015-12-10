module Writers
  class SessionsController < ApplicationController
    layout 'writers'

    rescue_from ActionController::ParameterMissing, with: -> { render plain: :missing, status: 401 }

    def new
      @session = WriterSession.new
    end

    def create_calm
      WriterSession.create!(session_params)
      render nothing: true, status: 201
    rescue Authlogic::Session::Existence::SessionInvalidError => e
      render nothing: true, status: 401
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

