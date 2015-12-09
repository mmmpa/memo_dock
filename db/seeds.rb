Writer.destroy_all
Writer.create!(email: ENV['MEMO_DOCK_EMAIL'], password: ENV['MEMO_DOCK_PASSWORD'])