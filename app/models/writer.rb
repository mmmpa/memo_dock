class Writer < ActiveRecord::Base
  acts_as_authentic do |c|
    c.require_password_confirmation = false
  end
end
