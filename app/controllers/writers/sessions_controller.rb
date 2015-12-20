module Writers
  class SessionsController < ApplicationController
    layout 'writers'

    rescue_from ActionController::ParameterMissing, with: -> { render plain: :missing, status: 401 }

    def show
      if WriterSession.find
        render nothing: true, status: 200
      else
        render nothing: true, status: 403
      end
    end

    def create
      WriterSession.create!(session_params)
      render nothing: true, status: 201
    rescue Authlogic::Session::Existence::SessionInvalidError => e
      render nothing: true, status: 401
    end

    def destroy
      WriterSession.find.destroy
      render nothing: true, status: 204
    end

    private

    def session_params
      params.require(:writer_session).permit(:email, :password)
    end
  end
end

