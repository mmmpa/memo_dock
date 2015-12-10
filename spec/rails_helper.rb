require "codeclimate-test-reporter"
CodeClimate::TestReporter.start
require 'coveralls'
Coveralls.wear!

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require 'factory_girl_rails'
require 'rspec-html-matchers'
require 'simplecov'
require 'simplecov-rcov'

if ENV['CI']
  SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter[Coveralls::SimpleCov::Formatter]
else
  SimpleCov.formatter = SimpleCov::Formatter::RcovFormatter
end

SimpleCov.start 'rails' do
  add_filter '/lib/'
  add_filter '/spec/'
end

Dir[Rails.root.join('spec/supports/**/*.rb')].each { |f| require f }
load "#{Rails.root}/db/schema.rb"
load "#{Rails.root}/db/seeds.rb"
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.order = :random
  config.include RSpecHtmlMatchers
  config.include FactoryGirl::Syntax::Methods

  config.before :all do
    FactoryGirl.reload
    FactoryGirl.factories.clear
    FactoryGirl.sequences.clear
    FactoryGirl.find_definitions
  end
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
