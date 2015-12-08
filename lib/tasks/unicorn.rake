namespace :unicorn do
  task(:start) do
    config = "#{Rails.root}/config/unicorn.rb"
    env = ENV['RAILS_ENV'] || 'production'
    sh "bundle exec unicorn_rails -D -c #{config} -E #{env}"
  end


  task(:stop) do
    unicorn_signal :QUIT
  end


  task(:restart) do
    unicorn_signal :USR2
  end


  task(:increment) do
    unicorn_signal :TTIN
  end


  task(:decrement) do
    unicorn_signal :TTOU
  end


  task(:pstree) do
    sh "pstree ' #{unicorn_pid}'"
  end


  def unicorn_signal signal
    Process.kill signal, unicorn_pid
  end


  def unicorn_pid
    begin
      File.read("#{Rails.root}/tmp/pids/unicorn.pid").to_i
    rescue Errno::ENOENT
      raise "Unicorn doesn't seem to be running"
    end
  end
end
