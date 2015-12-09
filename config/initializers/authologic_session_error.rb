# ActiveRecord::RecordInvalidと同じ挙動にする。
module Authlogic
  module Session
    module Existence
      class SessionInvalidError < ::StandardError # :nodoc:
        def initialize(session)
          super
          @record = session
        end

        def record
          @record
        end
      end
    end
  end
end