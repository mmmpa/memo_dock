require 'unicorn/worker_killer'
use Unicorn::WorkerKiller::MaxRequests, 400, 600
use Unicorn::WorkerKiller::Oom, (128*(1024**2)), (256*(1024**2))
require ::File.expand_path('../config/environment', __FILE__)
run Rails.application
