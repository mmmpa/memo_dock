app_dir = Pathname.new('__dir__').join('../')
shared_dir = app_dir.join('shared')

env =  ENV['RACK_ENV'] || ENV['RAILS_ENV'] || 'development'

workers Integer(ENV['WEB_CONCURRENCY'] || 1)
threads_count = Integer(ENV['RAILS_MAX_THREADS'] || 5)
threads threads_count, threads_count

preload_app!

rackup DefaultRackup

port ENV['PORT'] || 3000
environment env
bind "unix://#{shared_dir}/sockets/puma.sock"

daemonize(env == 'production')

on_worker_boot do
  ActiveRecord::Base.establish_connection
end


stdout_redirect(
  shared_dir.join('log/puma.stdout.log'),
  shared_dir.join('log/puma.stderr.log'),
  true
)

pidfile shared_dir.join('pids/puma.pid')
state_path shared_dir.join('pids/puma.state')

activate_control_app
