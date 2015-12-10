require 'pp'
class Constraint::Writer
  def matches?(request)
    WriterSession.controller = ControllerLike.new(request)
    !!WriterSession.find.try(:writer).tap{ WriterSession.controller = nil }
  end

  class ControllerLike
    def initialize(request)
      @request = request
    end

    def cookies
      @request.cookies
    end

    def params
      @request.params
    end

    def session
      @request.session
    end

    def responds_to_last_request_update_allowed?
      true
    end

    def last_request_update_allowed?
      false
    end

    def method_missing(*args)
      false
    end
  end
end